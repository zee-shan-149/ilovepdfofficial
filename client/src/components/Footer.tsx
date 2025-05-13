import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="bi bi-file-earmark-pdf text-primary text-3xl mr-2"></i>
              <h2 className="font-heading font-bold text-xl">PDF<span className="text-primary">Toolkit</span></h2>
            </div>
            <p className="text-gray-400 mb-4">The all-in-one PDF solution with 100+ free tools powered by AI.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/#tools" className="text-gray-400 hover:text-white">PDF Converter</Link></li>
              <li><Link href="/tools/compress-pdf" className="text-gray-400 hover:text-white">PDF Compressor</Link></li>
              <li><Link href="/tools/merge-pdf" className="text-gray-400 hover:text-white">PDF Merger</Link></li>
              <li><Link href="/tools/split-pdf" className="text-gray-400 hover:text-white">PDF Splitter</Link></li>
              <li><Link href="/#tools" className="text-gray-400 hover:text-white">AI PDF Tools</Link></li>
              <li><Link href="/#tools" className="text-gray-400 hover:text-white">All Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PDFToolkit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
