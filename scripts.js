document.addEventListener('DOMContentLoaded', function() {
    // Tool cards functionality
    const toolCards = document.querySelectorAll('.tool-card');
    const toolInterfaces = document.getElementById('tool-interfaces');
    const specificInterfaces = document.querySelectorAll('.tool-interface');
    const backButtons = document.querySelectorAll('.back-to-tools');
    
    // Add click event to all tool cards
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            const toolId = this.getAttribute('data-tool');
            showToolInterface(toolId);
        });
    });
    
    // Back buttons functionality
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideAllInterfaces();
        });
    });
    
    function showToolInterface(toolId) {
        // Show the tool interfaces container
        toolInterfaces.classList.remove('hidden');
        
        // Hide all specific interfaces
        specificInterfaces.forEach(interface => {
            interface.classList.add('hidden');
        });
        
        // Show the selected interface
        const selectedInterface = document.getElementById(`${toolId}-interface`);
        if (selectedInterface) {
            selectedInterface.classList.remove('hidden');
            selectedInterface.scrollIntoView({ behavior: 'smooth' });
            
            // Initialize the specific tool
            if (toolId === 'pdf-to-jpg') {
                initializePdfToJpgTool();
            } else if (toolId === 'word-to-pdf') {
                initializeWordToPdfTool();
            } else {
                // For tools that aren't fully implemented yet
                const toolName = this.querySelector('h4').textContent;
                alert(`The ${toolName} tool will be coming soon!`);
                hideAllInterfaces();
            }
        } else {
            alert('This tool will be available soon!');
            hideAllInterfaces();
        }
    }
    
    function hideAllInterfaces() {
        toolInterfaces.classList.add('hidden');
        document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
    }
    
    // PDF to JPG Tool Functionality
    function initializePdfToJpgTool() {
        const dropArea = document.getElementById('pdf-drop-area');
        const fileInput = document.getElementById('pdf-file');
        const convertButton = document.getElementById('convert-pdf-btn');
        const resultSection = document.getElementById('pdf-result');
        const resultImages = document.getElementById('pdf-result-images');
        
        // Reset the interface
        convertButton.disabled = true;
        resultSection.classList.add('hidden');
        
        // File selection via browse button
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handlePdfFile(this.files[0]);
            }
        });
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('bg-purple-100');
                dropArea.classList.add('border-purple-600');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('bg-purple-100');
                dropArea.classList.remove('border-purple-600');
            });
        });
        
        dropArea.addEventListener('drop', (e) => {
            const file = e.dataTransfer.files[0];
            if (file) {
                handlePdfFile(file);
            }
        });
        
        function handlePdfFile(file) {
            if (file.type === 'application/pdf') {
                // Update the drop area to show the file info
                dropArea.innerHTML = `
                    <i class="fas fa-file-pdf text-5xl text-purple-600 mb-4"></i>
                    <p class="font-medium">${file.name}</p>
                    <p class="text-sm text-gray-500">${formatFileSize(file.size)}</p>
                    <button id="remove-pdf" class="mt-4 text-red-500 text-sm">
                        <i class="fas fa-times mr-1"></i> Remove
                    </button>
                `;
                
                // Enable the convert button
                convertButton.disabled = false;
                
                // Add remove button functionality
                document.getElementById('remove-pdf').addEventListener('click', (e) => {
                    e.preventDefault();
                    resetPdfDropArea();
                });
                
                // Add convert button functionality
                convertButton.addEventListener('click', () => {
                    convertPdfToJpg(file);
                });
            } else {
                alert('Please select a valid PDF file.');
                resetPdfDropArea();
            }
        }
        
        function resetPdfDropArea() {
            dropArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt text-5xl text-purple-600 mb-4"></i>
                <p class="mb-2">Drag & drop your PDF file here or</p>
                <label for="pdf-file" class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 cursor-pointer">
                    Browse Files
                </label>
                <input type="file" id="pdf-file" class="hidden" accept=".pdf">
            `;
            
            // Reset convert button and result
            convertButton.disabled = true;
            resultSection.classList.add('hidden');
            
            // Reattach event listener to the new input
            document.getElementById('pdf-file').addEventListener('change', function() {
                if (this.files.length > 0) {
                    handlePdfFile(this.files[0]);
                }
            });
        }
        
        function convertPdfToJpg(file) {
            // Show loading state
            convertButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Converting...';
            convertButton.disabled = true;
            
            // Simulate processing delay
            setTimeout(() => {
                // Generate a random number of pages (1-5)
                const pageCount = Math.floor(Math.random() * 5) + 1;
                
                // Clear previous results
                resultImages.innerHTML = '';
                
                // Create result images
                for (let i = 1; i <= pageCount; i++) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'bg-white p-2 border rounded-md';
                    
                    imgContainer.innerHTML = `
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
                    
                    resultImages.appendChild(imgContainer);
                }
                
                // Show results
                resultSection.classList.remove('hidden');
                
                // Reset convert button
                convertButton.innerHTML = 'Convert to JPG';
                convertButton.disabled = false;
                
                // Add download all functionality
                document.getElementById('download-all-btn').addEventListener('click', () => {
                    alert('Download functionality would be implemented in a real application.');
                });
            }, 2000); // 2 second delay for simulation
        }
    }
    
    // Word to PDF Tool Functionality
    function initializeWordToPdfTool() {
        const dropArea = document.getElementById('word-drop-area');
        const fileInput = document.getElementById('word-file');
        const convertButton = document.getElementById('convert-word-btn');
        const resultSection = document.getElementById('word-result');
        const resultFilename = document.getElementById('result-filename');
        const resultFilesize = document.getElementById('result-filesize');
        
        // Reset the interface
        convertButton.disabled = true;
        resultSection.classList.add('hidden');
        
        // File selection via browse button
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleWordFile(this.files[0]);
            }
        });
        
        // Drag and drop functionality (similar to PDF to JPG)
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('bg-blue-100');
                dropArea.classList.add('border-blue-600');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('bg-blue-100');
                dropArea.classList.remove('border-blue-600');
            });
        });
        
        dropArea.addEventListener('drop', (e) => {
            const file = e.dataTransfer.files[0];
            if (file) {
                handleWordFile(file);
            }
        });
        
        function handleWordFile(file) {
            // Check if file is a Word document
            if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                // Update the drop area to show the file info
                dropArea.innerHTML = `
                    <i class="fas fa-file-word text-5xl text-blue-600 mb-4"></i>
                    <p class="font-medium">${file.name}</p>
                    <p class="text-sm text-gray-500">${formatFileSize(file.size)}</p>
                    <button id="remove-word" class="mt-4 text-red-500 text-sm">
                        <i class="fas fa-times mr-1"></i> Remove
                    </button>
                `;
                
                // Enable the convert button
                convertButton.disabled = false;
                
                // Add remove button functionality
                document.getElementById('remove-word').addEventListener('click', (e) => {
                    e.preventDefault();
                    resetWordDropArea();
                });
                
                // Add convert button functionality
                convertButton.addEventListener('click', () => {
                    convertWordToPdf(file);
                });
            } else {
                alert('Please select a valid Word document (.doc or .docx)');
                resetWordDropArea();
            }
        }
        
        function resetWordDropArea() {
            dropArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt text-5xl text-blue-600 mb-4"></i>
                <p class="mb-2">Drag & drop your Word document here or</p>
                <label for="word-file" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                    Browse Files
                </label>
                <input type="file" id="word-file" class="hidden" accept=".doc,.docx">
            `;
            
            // Reset convert button and result
            convertButton.disabled = true;
            resultSection.classList.add('hidden');
            
            // Reattach event listener to the new input
            document.getElementById('word-file').addEventListener('change', function() {
                if (this.files.length > 0) {
                    handleWordFile(this.files[0]);
                }
            });
        }
        
        function convertWordToPdf(file) {
            // Show loading state
            convertButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Converting...';
            convertButton.disabled = true;
            
            // Simulate processing delay
            setTimeout(() => {
                // Set result filename (replace .doc or .docx with .pdf)
                resultFilename.textContent = file.name.replace(/\.(doc|docx)$/, '.pdf');
                
                // Set a random file size (slightly smaller than original)
                const newSize = Math.round(file.size * 0.85);
                resultFilesize.textContent = formatFileSize(newSize);
                
                // Show results
                resultSection.classList.remove('hidden');
                
                // Reset convert button
                convertButton.innerHTML = 'Convert to PDF';
                convertButton.disabled = false;
                
                // Add download functionality
                document.getElementById('download-pdf-btn').addEventListener('click', () => {
                    alert('Download functionality would be implemented in a real application.');
                });
            }, 2000); // 2 second delay for simulation
        }
    }
    
    // Helper function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categorySections = {
        'basic': document.getElementById('basic-tools'),
        'convert': document.getElementById('convert-tools'),
        'advanced': document.getElementById('advanced-tools'),
        'ai': document.getElementById('ai-tools')
    };
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-purple-600', 'bg-primary');
                btn.classList.add('bg-secondary');
            });
            this.classList.remove('bg-secondary');
            this.classList.add('bg-purple-600', 'bg-primary');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Show/hide category sections
            if (category === 'all') {
                // Show all categories
                Object.values(categorySections).forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // Show only selected category
                Object.entries(categorySections).forEach(([key, section]) => {
                    if (key === category) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    });
});