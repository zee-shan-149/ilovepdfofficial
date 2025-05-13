<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Tools</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .category-card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
            pointer-events: none;
        }
        .tool-card:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
        }
        .hidden {
            display: none;
        }
        .bg-primary { background-color: #4a90e2; }
        .bg-secondary { background-color: #6b7280; }
        .text-primary { color: #4a90e2; }
        .border-primary { border-color: #4a90e2; }
        .bg-primary-light { background-color: rgba(74, 144, 226, 0.1); }
        .hover\:bg-primary-dark:hover { background-color: #357abd; }
    </style>
</head>
<body>
    <div class="container mx-auto px-4">
        <section class="hero py-12 text-center">
            <h1 class="text-4xl font-bold mb-4">PDF Tools Suite</h1>
            <p class="text-lg text-gray-600 mb-6">Powerful tools to manage, convert, and edit your PDF documents</p>
            <a href="#tools" class="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">Explore Tools</a>
        </section>

        <div class="flex justify-center mb-8">
            <button class="category-btn bg-primary text-white px-4 py-2 rounded-md mx-2 active" data-category="all">All</button>
            <button class="category-btn bg-secondary text-white px-4 py-2 rounded-md mx-2" data-category="basic">Basic</button>
            <button class="category-btn bg-secondary text-white px-4 py-2 rounded-md mx-2" data-category="convert">Convert</button>
            <button class="category-btn bg-secondary text-white px-4 py-2 rounded-md mx-2" data-category="advanced">Advanced</button>
            <button class="category-btn bg-secondary text-white px-4 py-2 rounded-md mx-2" data-category="ai">AI</button>
        </div>

        <div class="tools-container py-8"></div>

        <section id="tool-interfaces" class="container mx-auto px-4 py-8 hidden">
            <div id="pdf-to-jpg-interface" class="tool-interface hidden bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold mb-6 text-center">PDF to JPG Converter</h3>
                <div class="max-w-3xl mx-auto">
                    <div id="pdf-drop-area" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <i class="fas fa-cloud-upload-alt text-5xl text-purple-600 mb-4"></i>
                        <p class="mb-2">Drag & drop your PDF file here or</p>
                        <label for="pdf-file" class addEventListenerbg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 cursor-pointer">
                            Browse Files
                        </label>
                        <input type="file" id="pdf-file" class="hidden" accept=".pdf">
                    </div>
                    <div class="mt-6">
                        <button id="convert-pdf-btn" class="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Convert to JPG
                        </button>
                    </div>
                    <div id="pdf-result" class="mt-8 hidden">
                        <h4 class="font-bold text-lg mb-4">Conversion Results</h4>
                        <div id="pdf-result-images" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
                        <div class="mt-6 text-center">
                            <button id="download-all-btn" class="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700">
                                <i class="fas fa-download mr-2"></i> Download All
                            </button>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <button class="back-to-tools bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                        <i class="fas fa-arrow-left mr-2"></i> Back to Tools
                    </button>
                </div>
            </div>
            <div id="word-to-pdf-interface" class="tool-interface hidden bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold mb-6 text-center">Word to PDF Converter</h3>
                <div class="max-w-3xl mx-auto">
                    <div id="word-drop-area" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <i class="fas fa-cloud-upload-alt text-5xl text-blue-600 mb-4"></i>
                        <p class="mb-2">Drag & drop your Word document here or</p>
                        <label for="word-file" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                            Browse Files
                        </label>
                        <input type="file" id="word-file" class="hidden" accept=".doc,.docx">
                    </div>
                    <div class="mt-6">
                        <button id="convert-word-btn" class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            Convert to PDF
                        </button>
                    </div>
                    <div id="word-result" class="mt-8 hidden">
                        <h4 class="font-bold text-lg mb-4">Conversion Complete</h4>
                        <div class="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                            <div class="flex items-center">
                                <i class="fas fa-file-pdf text-4xl text-blue-600 mr-4"></i>
                                <div>
                                    <p id="result-filename" class="font-medium">document.pdf</p>
                                    <p id="result-filesize" class="text-sm text-gray-500">256 KB</p>
                                </div>
                            </div>
                            <button id="download-pdf-btn" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                                <i class="fas fa-download mr-2"></i> Download
                            </button>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <button class="back-to-tools bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                        <i class="fas fa-arrow-left mr-2"></i> Back to Tools
                    </button>
                </div>
            </div>
        </section>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const toolsData = {
                basic: [
                    { id: 'merge-pdf', name: 'Merge PDF', icon: 'fas fa-object-group', description: 'Combine multiple PDFs into a single document' },
                    { id: 'split-pdf', name: 'Split PDF', icon: 'fas fa-cut', description: 'Divide PDF into separate pages or page ranges' },
                    { id: 'compress-pdf', name: 'Compress PDF', icon: 'fas fa-compress-arrows-alt', description: 'Reduce file size while preserving quality' },
                    { id: 'remove-pages', name: 'Remove Pages', icon: 'fas fa-trash-alt', description: 'Delete specific pages from your PDF document' },
                    { id: 'rotate-pdf', name: 'Rotate PDF', icon: 'fas fa-sync', description: 'Change orientation of pages in your document' },
                    { id: 'add-page-numbers', name: 'Add Page Numbers', icon: 'fas fa-list-ol', description: 'Insert automatic page numbering to your PDF' },
                    { id: 'add-watermark', name: 'Add Watermark', icon: 'fas fa-tint', description: 'Insert text or image watermarks to protect documents' },
                    { id: 'rearrange-pages', name: 'Rearrange Pages', icon: 'fas fa-sort', description: 'Change the order of pages in your PDF' },
                    { id: 'pdf-reader', name: 'PDF Reader', icon: 'fas fa-book-reader', description: 'View and read PDF documents online' }
                ],
                convert: [
                    { id: 'pdf-to-word', name: 'PDF to Word', icon: 'fas fa-file-word', description: 'Convert PDF files to editable Word documents' },
                    { id: 'pdf-to-jpg', name: 'PDF to JPG', icon: 'fas fa-file-image', description: 'Convert PDF pages to JPG images' },
                    { id: 'word-to-pdf', name: 'Word to PDF', icon: 'fas fa-file-pdf', description: 'Convert Word documents to PDF format' },
                    { id: 'jpg-to-pdf', name: 'JPG to PDF', icon: 'fas fa-images', description: 'Convert images to PDF documents' },
                    { id: 'excel-to-pdf', name: 'Excel to PDF', icon: 'fas fa-file-excel', description: 'Convert Excel spreadsheets to PDF format' },
                    { id: 'pdf-to-excel', name: 'PDF to Excel', icon: 'fas fa-table', description: 'Extract tables from PDF to Excel spreadsheets' },
                    { id: 'pdf-to-text', name: 'PDF to Text', icon: 'fas fa-file-alt', description: 'Extract text content from PDF files' },
                    { id: 'ppt-to-pdf', name: 'PowerPoint to PDF', icon: 'fas fa-file-powerpoint', description: 'Convert presentations to PDF format' },
                    { id: 'html-to-pdf', name: 'HTML to PDF', icon: 'fas fa-code', description: 'Convert web pages to PDF documents' }
                ],
                advanced: [
                    { id: 'ocr-pdf', name: 'OCR PDF', icon: 'fas fa-file-search', description: 'Make scanned PDFs searchable with OCR' },
                    { id: 'encrypt-pdf', name: 'PDF Encryption', icon: 'fas fa-lock', description: 'Password protect and encrypt your PDF files' },
                    { id: 'decrypt-pdf', name: 'Remove Encryption', icon: 'fas fa-unlock', description: 'Remove password protection from PDF files' },
                    { id: 'edit-pdf', name: 'PDF Editor', icon: 'fas fa-edit', description: 'Edit text and images in PDF documents' },
                    { id: 'pdf-form', name: 'PDF Form Creator', icon: 'fas fa-file-signature', description: 'Create fillable PDF forms' },
                    { id: 'add-signature', name: 'Add Signature', icon: 'fas fa-signature', description: 'Add digital signatures to PDF documents' },
                    { id: 'pdf-to-pdf-a', name: 'PDF to PDF/A', icon: 'fas fa-archive', description: 'Convert PDF to PDF/A for long-term archiving' },
                    { id: 'repair-pdf', name: 'Repair PDF', icon: 'fas fa-wrench', description: 'Fix corrupted PDF files' },
                    { id: 'pdf-metadata', name: 'Edit Metadata', icon: 'fas fa-tags', description: 'View and edit PDF document properties' }
                ],
                ai: [
                    { id: 'ai-summarize', name: 'AI Summarize', icon: 'fas fa-robot', description: 'Generate summaries of PDF documents using AI' },
                    { id: 'ai-translate', name: 'AI Translate', icon: 'fas fa-language', description: 'Translate PDF documents to multiple languages' },
                    { id: 'ai-chatbot', name: 'AI ChatBot', icon: 'fas fa-comments', description: 'Chat with your PDF documents using AI' },
                    { id: 'ai-extract', name: 'AI Data Extraction', icon: 'fas fa-database', description: 'Extract specific data from PDFs using AI' },
                    { id: 'ai-redaction', name: 'AI Redaction', icon: 'fas fa-user-secret', description: 'Automatically redact sensitive information' },
                    { id: 'ai-formatting', name: 'AI Formatting', icon: 'fas fa-paragraph', description: 'Improve PDF layout and formatting with AI' },
                    { id: 'ai-keyword', name: 'AI Keyword Analysis', icon: 'fas fa-key', description: 'Extract and analyze keywords from PDFs' },
                    { id: 'ai-sentiment', name: 'AI Sentiment Analysis', icon: 'fas fa-smile', description: 'Analyze sentiment and tone in PDF documents' },
                    { id: 'ai-comparison', name: 'AI Document Comparison', icon: 'fas fa-not-equal', description: 'Compare PDFs and highlight differences with AI' }
                ]
            };

            const categoryInfo = {
                basic: {
                    title: 'Basic PDF Tools',
                    color: 'from-purple-500 to-indigo-600',
                    icon: 'fas fa-tools',
                    description: 'Essential tools for managing your PDF documents'
                },
                convert: {
                    title: 'Conversion Tools',
                    color: 'from-indigo-500 to-blue-600',
                    icon: 'fas fa-exchange-alt',
                    description: 'Convert PDFs to and from various file formats'
                },
                advanced: {
                    title: 'Advanced Tools',
                    color: 'from-blue-500 to-teal-600',
                    icon: 'fas fa-cogs',
                    description: 'Professional tools for advanced PDF operations'
                },
                ai: {
                    title: 'AI Features',
                    color: 'from-purple-600 to-pink-600',
                    icon: 'fas fa-brain',
                    description: 'Intelligent tools powered by artificial intelligence'
                }
            };

            const toolsContainer = document.querySelector('.tools-container');
            let categoryCardsHTML = '';

            Object.keys(categoryInfo).forEach(categoryKey => {
                const category = categoryInfo[categoryKey];
                const tools = toolsData[categoryKey];
                const categoryColor = {
                    basic: 'purple',
                    convert: 'blue',
                    advanced: 'teal',
                    ai: 'pink'
                }[categoryKey];

                categoryCardsHTML += `
                    <div class="category-card mb-12" data-category="${categoryKey}">
                        <div class="bg-gradient-to-r ${category.color} p-6 text-white relative overflow-hidden">
                            <div class="category-card-overlay"></div>
                            <div class="flex items-center mb-4">
                                <div class="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mr-4 category-icon">
                                    <i class="${category.icon} text-xl"></i>
                                </div>
                                <h3 class="text-2xl font-semibold">${category.title}</h3>
                            </div>
                            <p class="mb-4">${category.description}</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4 bg-white rounded-b-lg">
                                ${tools.map(tool => `
                                    <div class="tool-card bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg" data-tool="${tool.id}">
                                        <div class="p-4">
                                            <div class="flex items-center mb-3">
                                                <div class="bg-${categoryColor}-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                                                    <i class="${tool.icon} text-${categoryColor}-600"></i>
                                                </div>
                                                <h4 class="font-medium">${tool.name}</h4>
                                            </div>
                                            <p class="text-gray-600 text-sm mb-3">${tool.description}</p>
                                            <button class="use-tool-btn w-full bg-${categoryColor}-600 hover:bg-${categoryColor}-700 text-white py-2 rounded-md transition">
                                                Use Tool
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="view-tools-btn bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium flex items-center">
                                <span>View Tools</span>
                                <i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>
                            </button>
                            <div class="category-tools hidden mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                ${tools.map(tool => `
                                    <div class="tool-card bg-white/90 rounded-lg p-3 flex items-center" data-tool="${tool.id}">
                                        <div class="bg-white/80 w-10 h-10 rounded-full flex items-center justify-center mr-3 tool-icon">
                                            <i class="${tool.icon} text-${categoryColor}-600"></i>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-sm text-gray-800">${tool.name}</h4>
                                            <p class="text-xs text-gray-600 truncate">${tool.description}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            });

            toolsContainer.innerHTML = categoryCardsHTML;

            gsapInit();
            setTimeout(initCategoryCards, 300);
            setTimeout(initToolFunctionality, 500);
            initCategoryFilter();

            document.querySelectorAll('.back-to-tools').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.getElementById('tool-interfaces').classList.add('hidden');
                    document.querySelectorAll('.tool-interface').forEach(section => {
                        section.classList.add('hidden');
                    });
                    document.querySelector('.tools-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        });

        const gsapInit = () => {
            gsap.registerPlugin(ScrollTrigger);
            gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
            gsap.from('.hero p', { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: 'power3.out' });
            gsap.from('.hero a', { opacity: 0, y: 30, duration: 1, delay: 0.6, ease: 'power3.out' });
            const categoryCards = document.querySelectorAll('.category-card');
            gsap.from(categoryCards, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: { trigger: '.tools-container', start: "top 80%" }
            });
        };

        const initCategoryCards = () => {
            const categoryCards = document.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                const viewToolsBtn = card.querySelector('.view-tools-btn');
                const chevronIcon = viewToolsBtn.querySelector('i');
                const categoryTools = card.querySelector('.category-tools');
                categoryTools.style.display = 'none';
                viewToolsBtn.addEventListener('click', () => {
                    const isExpanded = categoryTools.style.display !== 'none';
                    if (isExpanded) {
                        gsap.to(categoryTools, {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            onComplete: () => { categoryTools.style.display = 'none'; }
                        });
                        chevronIcon.style.transform = 'rotate(0deg)';
                        viewToolsBtn.querySelector('span').textContent = 'View Tools';
                    } else {
                        categoryTools.style.display = 'grid';
                        gsap.fromTo(categoryTools, 
                            { height: 0, opacity: 0 },
                            { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
                        );
                        const toolCards = categoryTools.querySelectorAll('.tool-card');
                        gsap.fromTo(toolCards,
                            { y: 20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power1.out' }
                        );
                        chevronIcon.style.transform = 'rotate(180deg)';
                        viewToolsBtn.querySelector('span').textContent = 'Hide Tools';
                    }
                });
            });
        };

        const initToolFunctionality = () => {
            const toolCards = document.querySelectorAll('.tool-card');
            const toolSections = document.querySelectorAll('.tool-interface');
            toolSections.forEach(section => { section.classList.add('hidden'); });
            toolCards.forEach(card => {
                card.addEventListener('click', () => {
                    const toolId = card.getAttribute('data-tool');
                    const toolSection = document.getElementById(`${toolId}-interface`);
                    toolSections.forEach(section => { section.classList.add('hidden'); });
                    if (toolSection) {
                        document.getElementById('tool-interfaces').classList.remove('hidden');
                        toolSection.classList.remove('hidden');
                        const content = toolSection.querySelector('.tool-content') || toolSection;
                        content.classList.add('active');
                        gsap.to(content, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
                        toolSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        initializeToolFunctionality(toolId);
                    } else {
                        alert(`The "${toolId}" tool functionality will be implemented soon.`);
                    }
                });
            });
            initializePdfToJpgTool();
            initializeWordToPdfTool();
        };

        function initializeToolFunctionality(toolId) {
            switch(toolId) {
                case 'pdf-to-jpg':
                    initializePdfToJpgTool();
                    break;
                case 'word-to-pdf':
                    initializeWordToPdfTool();
                    break;
            }
        }

        function initializePdfToJpgTool() {
            const dropArea = document.getElementById('pdf-drop-area');
            const fileInput = document.getElementById('pdf-file');
            const convertBtn = document.getElementById('convert-pdf-btn');
            const resultSection = document.getElementById('pdf-result');
            const resultImages = document.getElementById('pdf-result-images');
            const downloadAllBtn = document.getElementById('download-all-btn');

            if (dropArea && fileInput && convertBtn) {
                dropArea.classList.add('pulse-animation');
                fileInput.addEventListener('change', (e) => { handlePdfFile(e.target.files[0]); });
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    dropArea.addEventListener(eventName, preventDefaults, false);
                });

                function preventDefaults(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                ['dragenter', 'dragover'].forEach(eventName => {
                    dropArea.addEventListener(eventName, highlight, false);
                });

                ['dragleave', 'drop'].forEach(eventName => {
                    dropArea.addEventListener(eventName, unhighlight, false);
                });

                function highlight() {
                    dropArea.classList.add('bg-purple-100', 'border-purple-600');
                }

                function unhighlight() {
                    dropArea.classList.remove('bg-purple-100', 'border-purple-600');
                }

                dropArea.addEventListener('drop', (e) => {
                    const dt = e.dataTransfer;
                    const file = dt.files[0];
                    handlePdfFile(file);
                });

                function handlePdfFile(file) {
                    if (file && file.type === 'application/pdf') {
                        dropArea.classList.remove('pulse-animation');
                        convertBtn.disabled = false;
                        dropArea.innerHTML = `
                            <i class="fas fa-file-pdf text-5xl text-purple-600 mb-4"></i>
                            <p class="font-medium">${file.name}</p>
                            <p class="text-sm text-gray-500">${formatFileSize(file.size)}</p>
                            <button class="mt-4 text-red-500 text-sm" id="remove-pdf">
                                <i class="fas fa-times mr-1"></i> Remove
                            </button>
                        `;
                        document.getElementById('remove-pdf').addEventListener('click', (e) => {
                            e.preventDefault();
                            resetPdfUpload();
                        });
                        convertBtn.onclick = () => {
                            convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Converting...';
                            convertBtn.disabled = true;
                            setTimeout(() => { simulatePdfConversion(file); }, 2000);
                        };
                    } else {
                        alert('Please select a valid PDF file.');
                        resetPdfUpload();
                    }
                }

                function resetPdfUpload() {
                    dropArea.innerHTML = `
                        <i class="fas fa-cloud-upload-alt text-5xl text-purple-600 mb-4"></i>
                        <p class="mb-2">Drag & drop your PDF file here or</p>
                        <label for="pdf-file" class="cursor-pointer inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
                            Browse Files
                        </label>
                        <input type="file" id="pdf-file" accept=".pdf" class="hidden" />
                    `;
                    const newFileInput = document.getElementById('pdf-file');
                    newFileInput.addEventListener('change', (e) => {
                        handlePdfFile(e.target.files[0]);
                    });
                    dropArea.classList.add('pulse-animation');
                    convertBtn.disabled = true;
                    convertBtn.innerHTML = 'Convert to JPG';
                    if (resultSection) { resultSection.classList.add('hidden'); }
                }

                function simulatePdfConversion(file) {
                    const imageCount = Math.floor(Math.random() * 4) + 2;
                    resultImages.innerHTML = '';
                    for (let i = 1; i <= imageCount; i++) {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'bg-white p-2 border rounded-md fade-in-up';
                        resultItem.style.animationDelay = `${i * 0.15}s`;
                        resultItem.innerHTML = `
                            <div class="bg-gray-200 aspect-[3/4] flex items-center justify-center">
                                <span class="text-gray-500">Page ${i}</span>
                            </div>
                            <div class="mt-2 flex justify-between items-center">
                                <span class="text-xs text-gray-500">page${i}.jpg</span>
                                <a href="#" class="text-purple-600 text-sm">
                                    <i class="fas fa-download"></i>
                                </a>
                            </div>
                        `;
                        resultImages.appendChild(resultItem);
                    }
                    resultSection.classList.remove('hidden');
                    convertBtn.innerHTML = 'Convert to JPG';
                    convertBtn.disabled = false;
                    downloadAllBtn.onclick = () => {
                        alert('Download functionality would be implemented in a real application.');
                    };
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        function initializeWordToPdfTool() {
            const dropArea = document.getElementById('word-drop-area');
            const fileInput = document.getElementById('word-file');
            const convertBtn = document.getElementById('convert-word-btn');
            const resultSection = document.getElementById('word-result');
            const resultFilename = document.getElementById('result-filename');
            const resultFilesize = document.getElementById('result-filesize');
            const downloadBtn = document.getElementById('download-pdf-btn');

            if (dropArea && fileInput && convertBtn) {
                dropArea.classList.add('pulse-animation');
                fileInput.addEventListener('change', (e) => { handleWordFile(e.target.files[0]); });
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    dropArea.addEventListener(eventName, preventDefaults, false);
                });

                function preventDefaults(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                ['dragenter', 'dragover'].forEach(eventName => {
                    dropArea.addEventListener(eventName, () => {
                        dropArea.classList.add('bg-blue-100', 'border-blue-600');
                    });
                });

                ['dragleave', 'drop'].forEach(eventName => {
                    dropArea.addEventListener(eventName, () => {
                        dropArea.classList.remove('bg-blue-100', 'border-blue-600');
                    });
                });

                dropArea.addEventListener('drop', (e) => {
                    const dt = e.dataTransfer;
                    const file = dt.files[0];
                    handleWordFile(file);
                });

                function handleWordFile(file) {
                    if (file && (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
                        dropArea.classList.remove('pulse-animation');
                        convertBtn.disabled = false;
                        dropArea.innerHTML = `
                            <i class="fas fa-file-word text-5xl text-blue-600 mb-4"></i>
                            <p class="font-medium">${file.name}</p>
                            <p class="text-sm text-gray-500">${formatFileSize(file.size)}</p>
                            <button class="mt-4 text-red-500 text-sm" id="remove-word">
                                <i class="fas fa-times mr-1"></i> Remove
                            </button>
                        `;
                        document.getElementById('remove-word').addEventListener('click', (e) => {
                            e.preventDefault();
                            resetWordUpload();
                        });
                        convertBtn.onclick = () => {
                            convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Converting...';
                            convertBtn.disabled = true;
                            setTimeout(() => { simulateWordConversion(file); }, 2000);
                        };
                    } else {
                        alert('Please select a valid Word document (.doc or .docx).');
                        resetWordUpload();
                    }
                }

                function resetWordUpload() {
                    dropArea.innerHTML = `
                        <i class="fas fa-cloud-upload-alt text-5xl text-blue-600 mb-4"></i>
                        <p class="mb-2">Drag & drop your Word file here or</p>
                        <label for="word-file" class="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            Browse Files
                        </label>
                        <input type="file" id="word-file" accept=".doc,.docx" class="hidden" />
                    `;
                    const newFileInput = document.getElementById('word-file');
                    newFileInput.addEventListener('change', (e) => {
                        handleWordFile(e.target.files[0]);
                    });
                    dropArea.classList.add('pulse-animation');
                    convertBtn.disabled = true;
                    convertBtn.innerHTML = 'Convert to PDF';
                    if (resultSection) { resultSection.classList.add('hidden'); }
                }

                function simulateWordConversion(file) {
                    resultFilename.textContent = file.name.replace(/\.(doc|docx)$/, '.pdf');
                    const originalSize = file.size;
                    const newSize = Math.round(originalSize * 0.9);
                    resultFilesize.textContent = formatFileSize(newSize);
                    resultSection.classList.remove('hidden');
                    gsap.from(resultSection, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        ease: 'back.out(1.7)'
                    });
                    convertBtn.innerHTML = 'Convert to PDF';
                    convertBtn.disabled = false;
                    downloadBtn.onclick = (e) => {
                        e.preventDefault();
                        alert('In a real application, this would download the converted PDF file.');
                    };
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        const initCategoryFilter = () => {
            const categoryBtns = document.querySelectorAll('.category-btn');
            setTimeout(() => {
                const categoryCards = document.querySelectorAll('.category-card');
                categoryBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        categoryBtns.forEach(b => b.classList.remove('active', 'bg-primary'));
                        categoryBtns.forEach(b => b.classList.add('bg-secondary'));
                        btn.classList.remove('bg-secondary');
                        btn.classList.add('active', 'bg-primary');
                        const category = btn.getAttribute('data-category');
                        categoryCards.forEach(card => {
                            const cardCategory = card.getAttribute('data-category');
                            if (category === 'all' || cardCategory === category) {
                                gsap.to(card, { 
                                    opacity: 1, 
                                    scale: 1, 
                                    height: 'auto',
                                    duration: 0.5, 
                                    ease: 'power2.out',
                                    onStart: function() { card.style.display = 'block'; }
                                });
                            } else {
                                gsap.to(card, { 
                                    opacity: 0, 
                                    scale: 0.95, 
                                    height: 0,
                                    duration: 0.5, 
                                    ease: 'power2.out',
                                    onComplete: function() { card.style.display = 'none'; }
                                });
                            }
                        });
                    });
                });
            }, 500);
        };

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    </script>
</body>
</html>