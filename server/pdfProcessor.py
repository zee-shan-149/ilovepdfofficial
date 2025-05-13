#!/usr/bin/env python3
"""
PDF Processing Server for PDF Tools Website

This module contains functions for processing PDF files using PyPDF2 and other
free, open-source tools. It's designed to replace the API-dependent functions
with local processing capabilities.
"""

import os
import sys
import json
import io
import base64
import tempfile
from PyPDF2 import PdfReader, PdfWriter
from docx import Document
import nltk
import re
from langdetect import detect
import random

# Download required NLTK data (will only download once)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)
    
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords', quiet=True)

from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize

def extract_text_from_pdf(pdf_content):
    """Extract text from a PDF file using PyPDF2."""
    try:
        # Convert base64 string to bytes
        pdf_bytes = base64.b64decode(pdf_content)
        
        # Create a BytesIO object to use with PdfReader
        pdf_file = io.BytesIO(pdf_bytes)
        
        # Create a PDF reader object
        pdf_reader = PdfReader(pdf_file)
        
        # Extract text from each page
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text() + "\n\n"
        
        return {"success": True, "text": text}
    except Exception as e:
        return {"success": False, "error": str(e)}

def compress_pdf(pdf_content, compression_level):
    """Compress a PDF file (mock implementation)."""
    # In a real implementation, we would use compression settings
    # For now, just return the same PDF content
    try:
        # Convert base64 string to bytes
        pdf_bytes = base64.b64decode(pdf_content)
        
        # Create a BytesIO object for input and output
        pdf_input = io.BytesIO(pdf_bytes)
        pdf_output = io.BytesIO()
        
        # Create PDF reader and writer objects
        reader = PdfReader(pdf_input)
        writer = PdfWriter()
        
        # Add all pages to the writer
        for page in reader.pages:
            writer.add_page(page)
            
        # Set compression parameters based on compression_level
        if compression_level == "high":
            # In a real implementation, this would use higher compression
            compression_params = {"compress_streams": True, "compress_images": True}
        elif compression_level == "medium":
            compression_params = {"compress_streams": True, "compress_images": False}
        else:  # low
            compression_params = {"compress_streams": False, "compress_images": False}
        
        # Write the compressed PDF to the output
        writer.write(pdf_output)
        pdf_output.seek(0)
        
        # Convert the BytesIO object to base64
        compressed_content = base64.b64encode(pdf_output.getvalue()).decode('utf-8')
        
        return {
            "success": True, 
            "pdf": compressed_content,
            "compression_level": compression_level,
            "original_size": len(pdf_bytes),
            "compressed_size": len(pdf_output.getvalue())
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def pdf_to_docx(pdf_content):
    """Convert a PDF to a Word document using PyPDF2 and python-docx."""
    try:
        # Convert base64 string to bytes
        pdf_bytes = base64.b64decode(pdf_content)
        
        # Create a BytesIO object to use with PdfReader
        pdf_file = io.BytesIO(pdf_bytes)
        
        # Create a PDF reader object
        pdf_reader = PdfReader(pdf_file)
        
        # Create a new Word document
        doc = Document()
        
        # Extract text from each page and add to the Word document
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            
            # Add a page break if not the first page
            if page_num > 0:
                doc.add_page_break()
            
            # Add text to the document
            doc.add_paragraph(text)
        
        # Save the document to a BytesIO object
        docx_file = io.BytesIO()
        doc.save(docx_file)
        docx_file.seek(0)
        
        # Convert the BytesIO object to base64
        docx_content = base64.b64encode(docx_file.getvalue()).decode('utf-8')
        
        return {
            "success": True, 
            "docx": docx_content,
            "filename": "converted_document.docx"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def summarize_text(text, length):
    """Summarize text using NLTK."""
    try:
        # Detect language (default to English if detection fails)
        try:
            language = detect(text)
            if language not in ['en', 'eng']:
                # If not English, provide a message and still try processing
                print(f"Warning: Detected language '{language}', optimized for English")
        except:
            language = 'en'
            
        # Determine the target length in sentences based on the specified length
        if length == 'brief':
            target_sentences = 3
        elif length == 'moderate':
            target_sentences = 7
        else:  # detailed
            target_sentences = 12
            
        # Tokenize the text into sentences
        sentences = sent_tokenize(text)
        
        # If we have fewer sentences than target, return all of them
        if len(sentences) <= target_sentences:
            return {
                "success": True,
                "summary": text,
                "length": length
            }
            
        # Get the stop words for English
        stop_words = set(stopwords.words('english'))
        
        # Tokenize the text and calculate word frequencies
        words = word_tokenize(text.lower())
        word_frequencies = {}
        for word in words:
            if word not in stop_words and word.isalnum():
                if word not in word_frequencies:
                    word_frequencies[word] = 1
                else:
                    word_frequencies[word] += 1
                    
        # Calculate sentence scores based on word frequencies
        sentence_scores = {}
        for i, sentence in enumerate(sentences):
            sentence_words = word_tokenize(sentence.lower())
            score = 0
            for word in sentence_words:
                if word in word_frequencies:
                    score += word_frequencies[word]
            sentence_scores[i] = score / max(1, len(sentence_words))
            
        # Get the top N sentences
        top_sentences_indices = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:target_sentences]
        top_sentences_indices.sort()  # Sort indices to maintain original order
        
        # Construct the summary
        summary = " ".join([sentences[i] for i in top_sentences_indices])
        
        return {
            "success": True,
            "summary": summary,
            "length": length
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def extract_keywords(text, count=10):
    """Extract keywords from text using NLTK."""
    try:
        # Get the stop words for English
        stop_words = set(stopwords.words('english'))
        
        # Tokenize and clean the text
        words = word_tokenize(text.lower())
        filtered_words = [word for word in words if word.isalnum() and word not in stop_words and len(word) > 2]
        
        # Count word frequencies
        word_freq = {}
        for word in filtered_words:
            if word in word_freq:
                word_freq[word] += 1
            else:
                word_freq[word] = 1
                
        # Sort by frequency
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        
        # Get the top N keywords
        keywords = [word for word, freq in sorted_words[:count]]
        
        return {
            "success": True,
            "keywords": keywords,
            "count": len(keywords)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def rewrite_text(text, tone):
    """Rewrite text in a different tone (simplified implementation)."""
    try:
        # In a production environment, this would use more sophisticated NLP techniques
        # For this demo, we'll implement a very basic tone shifter
        
        # Detect language (default to English if detection fails)
        try:
            language = detect(text)
            if language not in ['en', 'eng']:
                # If not English, provide a message and still try processing
                print(f"Warning: Detected language '{language}', optimized for English")
        except:
            language = 'en'
            
        # Split the text into sentences
        sentences = sent_tokenize(text)
        
        # Apply tone-specific transformations
        transformed_sentences = []
        
        for sentence in sentences:
            if tone == 'formal':
                # Replace informal words with formal alternatives
                sentence = sentence.replace("don't", "do not")
                sentence = sentence.replace("can't", "cannot")
                sentence = sentence.replace("won't", "will not")
                sentence = sentence.replace("I'm", "I am")
                sentence = sentence.replace("you're", "you are")
                sentence = sentence.replace("they're", "they are")
                sentence = sentence.replace("we're", "we are")
                sentence = sentence.replace("it's", "it is")
                sentence = sentence.replace("let's", "let us")
                sentence = sentence.replace("gonna", "going to")
                sentence = sentence.replace("wanna", "want to")
                # Remove excess exclamation marks
                sentence = re.sub(r'!+', '.', sentence)
            
            elif tone == 'casual':
                # Add casual markers and contractions
                if random.random() < 0.1:
                    sentence = sentence.rstrip('.') + "!"
                sentence = sentence.replace("do not", "don't")
                sentence = sentence.replace("cannot", "can't")
                sentence = sentence.replace("will not", "won't")
                sentence = sentence.replace("I am", "I'm")
                sentence = sentence.replace("you are", "you're")
                sentence = sentence.replace("they are", "they're")
                sentence = sentence.replace("we are", "we're")
                sentence = sentence.replace("it is", "it's")
                sentence = sentence.replace("let us", "let's")
            
            elif tone == 'simple':
                # Simplify by shortening sentences
                words = word_tokenize(sentence)
                if len(words) > 15:
                    # Truncate long sentences
                    sentence = " ".join(words[:12]) + "."
            
            elif tone == 'technical':
                # Add technical-sounding phrases
                if random.random() < 0.2:
                    technical_phrases = [
                        "Based on the analysis, ",
                        "Research indicates that ",
                        "As per the specification, ",
                        "The data demonstrates that ",
                        "According to the findings, "
                    ]
                    sentence = random.choice(technical_phrases) + sentence[0].lower() + sentence[1:]
            
            transformed_sentences.append(sentence)
        
        rewritten_text = " ".join(transformed_sentences)
        
        return {
            "success": True,
            "rewritten_text": rewritten_text,
            "tone": tone
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def chat_with_pdf(pdf_text, question):
    """Answer questions about PDF content (simplified implementation)."""
    try:
        # In a production environment, this would use more sophisticated techniques
        # For this demo, we'll use a simple keyword-based approach
        
        # Tokenize the PDF text and the question
        pdf_tokens = word_tokenize(pdf_text.lower())
        question_tokens = word_tokenize(question.lower())
        
        # Get the stop words for English
        stop_words = set(stopwords.words('english'))
        
        # Filter out stop words from the question
        filtered_question = [word for word in question_tokens if word.isalnum() and word not in stop_words]
        
        # Split the PDF text into sentences
        sentences = sent_tokenize(pdf_text)
        
        # Score each sentence based on how many question words it contains
        sentence_scores = []
        for sentence in sentences:
            sentence_lower = sentence.lower()
            score = 0
            for word in filtered_question:
                if word in sentence_lower:
                    score += 1
            sentence_scores.append((sentence, score))
        
        # Sort sentences by score in descending order
        sentence_scores.sort(key=lambda x: x[1], reverse=True)
        
        # Construct an answer using the top 3 sentences (if we have matches)
        matching_sentences = [s for s, score in sentence_scores if score > 0][:3]
        
        if matching_sentences:
            answer = " ".join(matching_sentences)
            # Add an introduction
            answer = f"Based on the document content, here's what I found: {answer}"
        else:
            answer = "I couldn't find specific information about that in the document. Please ask another question or try rephrasing your query."
        
        return {
            "success": True,
            "answer": answer
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

def translate_text(text, target_language):
    """
    Translate text to the target language.
    
    Note: This is a simple demonstration that doesn't actually translate but simulates it.
    A real implementation would use a translation library like googletrans or connect to
    a translation API.
    """
    try:
        # In a production environment, this would use a translation library
        # For this demo, we'll return a message explaining that actual translation
        # would require an external service
        
        # Detect the source language
        try:
            source_language = detect(text)
        except:
            source_language = "unknown"
            
        message = f"""
TRANSLATION SIMULATION

[Source detected as: {source_language}]
[Target language: {target_language}]

The actual translation from {source_language} to {target_language} would require an external 
translation service or library like Google Translate API, DeepL, or Lingva Translate.

In a production environment, this function would:
1. Connect to a translation API
2. Send the text for translation
3. Return the translated content

For a free alternative, consider using:
- LibreTranslate (open-source)
- Lingva Translate (open-source)
- Argos Translate (open-source)

Sample of original text:
{text[:200]}...
"""
        
        return {
            "success": True,
            "translated_text": message,
            "source_language": source_language,
            "target_language": target_language
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

# Main function to handle requests from Node.js
if __name__ == "__main__":
    # Get input from stdin (sent by Node.js)
    input_data = json.loads(sys.stdin.read())
    
    operation = input_data.get("operation")
    result = {"success": False, "error": "Unknown operation"}
    
    # Process based on the requested operation
    if operation == "extract_text":
        result = extract_text_from_pdf(input_data.get("pdf_content"))
    elif operation == "compress_pdf":
        result = compress_pdf(
            input_data.get("pdf_content"),
            input_data.get("compression_level", "medium")
        )
    elif operation == "pdf_to_docx":
        result = pdf_to_docx(input_data.get("pdf_content"))
    elif operation == "summarize":
        result = summarize_text(
            input_data.get("text"),
            input_data.get("length", "moderate")
        )
    elif operation == "extract_keywords":
        result = extract_keywords(
            input_data.get("text"),
            input_data.get("count", 10)
        )
    elif operation == "rewrite":
        result = rewrite_text(
            input_data.get("text"),
            input_data.get("tone", "formal")
        )
    elif operation == "chat":
        result = chat_with_pdf(
            input_data.get("text"),
            input_data.get("question")
        )
    elif operation == "translate":
        result = translate_text(
            input_data.get("text"),
            input_data.get("target_language")
        )
    
    # Output result as JSON (will be captured by Node.js)
    print(json.dumps(result))