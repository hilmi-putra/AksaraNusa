import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";
import { formatRupiah } from "@/lib/utils";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onConfirm: (book: Book, quantity: number) => void;
}

export function AddToCartModal({ isOpen, onClose, book, onConfirm }: AddToCartModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!book) return null;

  const handleConfirm = () => {
    onConfirm(book, quantity);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setQuantity(1);
      }
    }}>
      <DialogContent className="sm:max-w-[500px] p-0 rounded-none overflow-hidden bg-white border-0" showCloseButton={true}>
        <DialogHeader className="p-4 border-b border-gray-100 flex flex-row items-center justify-between">
          <DialogTitle className="text-xs font-bold uppercase tracking-widest text-[#171512] m-0">
            Add to Cart
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="flex gap-6 mb-8">
            <div className="w-24 h-32 bg-[#F0EBE1] shrink-0 flex items-center justify-center p-2 rounded-sm shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={book.coverUrl || "https://placehold.co/100x150"} 
                alt={book.title} 
                className="max-w-full max-h-full object-contain shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1 pt-2">
              <h3 className="font-bold text-[#171512] text-sm uppercase tracking-wider line-clamp-2">{book.title}</h3>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1 line-clamp-1">{book.author}</p>
              <p className="font-semibold text-[#171512] text-sm">{formatRupiah(book.price)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-sm">
                <button 
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="w-12 h-10 text-center text-[#171512] bg-transparent focus:outline-none appearance-none font-bold text-sm"
                  min="1"
                  max={book.stock || 10}
                />
                <button 
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => setQuantity(Math.min(book.stock || 10, quantity + 1))}
                >
                  +
                </button>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold tracking-wider">
                Max {book.stock || 10}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 rounded-none border-[#171512] text-[#171512] hover:bg-gray-50 h-12 text-xs font-bold uppercase tracking-widest"
              onClick={() => {
                onClose();
                setQuantity(1);
              }}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 rounded-none bg-gradient-primary hover:bg-[#E0790A] text-white h-12 text-xs font-bold uppercase tracking-widest shadow-md"
              onClick={handleConfirm}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
