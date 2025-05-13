interface AdBannerProps {
  className?: string;
  small?: boolean;
  tall?: boolean;
}

export default function AdBanner({ className = '', small = false, tall = false }: AdBannerProps) {
  return (
    <div 
      className={`bg-gray-100 rounded-xl p-4 flex items-center justify-center ${className}`} 
      data-mock="true"
    >
      <div className="text-center">
        <span className="text-gray-500 text-sm font-medium">ADVERTISEMENT</span>
        {tall && <div className="py-20"></div>}
        {!tall && !small && <div className="py-6"></div>}
        {small && <div className="py-10"></div>}
      </div>
    </div>
  );
}
