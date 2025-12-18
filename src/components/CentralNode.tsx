import { Handle, Position, NodeProps } from 'reactflow';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Menu } from 'lucide-react';

export function CentralNode({ data, selected }: NodeProps<{ label: string }>) {
  return (
    <div className="relative">
      <div className={`w-96 h-64 rounded-lg shadow-lg hover:shadow-2xl transition-all overflow-hidden ${selected ? 'border-4 border-black' : 'border-4 border-white'}`}>
        <ImageWithFallback
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWdtMzhteXVvNmhzZTF1bDNneHgyeTdxc3ZuN3V3dThvOXF4czQ4bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0Wru3QxfNTFiqgFNPb/giphy.gif"
          alt="Insignia"
          className="w-full h-full object-cover"
        />
      </div>
      {selected && (
        <button className="absolute -top-3 -right-3 w-10 h-10 bg-black rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group/btn animate-in fade-in zoom-in-95 duration-200">
          <Menu className="w-5 h-5 text-white group-hover/btn:text-black" />
        </button>
      )}
    </div>
  );
}