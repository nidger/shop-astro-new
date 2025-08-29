import type { Product } from '@/data/products';
import { colorOptions } from '@/data/variants';

export function ProductCard({ product }: { product: Product }) {
  const { id, slug, images, title, price, colors } = product;

  // Construct the unique view transition name for the product image container
  const transitionName = `product-image-${id}`;

  return (
    <a href={`/products/${slug}`}>
      <div className="bg-card rounded-lg p-4 hover:bg-card-hover transition-colors cursor-pointer h-full flex flex-col">
        <div 
          className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden" 
          style={{ viewTransitionName: transitionName }}
        >
          <img 
            src={images[0].src.src} // Accessing the processed src for standard img tag
            alt={images[0].alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-card-foreground mb-1 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-price font-medium text-sm mb-2">{price}</p>
        </div>
        
        {colors && (
          <div className="flex space-x-1 mt-auto">
            {colors.map((colorKey) => {
              const color = colorOptions[colorKey];
              if (!color) return null;
              return (
                <div 
                  key={colorKey}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              );
            })}
          </div>
        )}
      </div>
    </a>
  );
}