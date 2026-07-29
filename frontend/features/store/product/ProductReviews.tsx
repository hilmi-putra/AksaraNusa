import React from "react";
import { Star } from "lucide-react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/ui/button";

export function ProductReviews() {
  const reviews = [
    {
      id: 1,
      user: "Andi Wijaya",
      rating: 5,
      date: "2 hari yang lalu",
      comment: "Buku yang sangat menginspirasi! Saya tidak bisa berhenti membacanya dari halaman pertama sampai akhir. Alurnya rapi dan karakternya sangat hidup.",
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      rating: 4,
      date: "1 minggu yang lalu",
      comment: "Pengemasan rapi dan pengiriman cepat. Untuk isinya lumayan bagus, ada beberapa bagian yang membuat saya merenung. Recommended!",
    },
    {
      id: 3,
      user: "Budi Santoso",
      rating: 5,
      date: "2 minggu yang lalu",
      comment: "Luar biasa! Penulis benar-benar berhasil menyampaikan emosinya lewat kata-kata. Worth every penny.",
    }
  ];

  return (
    <div className="mt-16">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <Typography  variant="h2" className="mb-2">
            Ulasan Pembaca
          </Typography>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9/5</span>
            <span className="text-muted-foreground">(128 ulasan)</span>
          </div>
        </div>
        <Button variant="outline" className="rounded-full shrink-0">
          Tulis Ulasan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-2xl border border-border flex flex-col h-full">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <Typography variant="p" className="mt-0 flex-grow">
              "{review.comment}"
            </Typography>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
              <span className="font-medium text-ink">{review.user}</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="ghost" className="text-primary hover:bg-primary/10 rounded-full">
          Lihat Semua Ulasan
        </Button>
      </div>
    </div>
  );
}
