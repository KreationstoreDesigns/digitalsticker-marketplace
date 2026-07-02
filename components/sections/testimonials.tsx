"use client";

export function Testimonials() {
  const testimonials = [
    {
      author: "Sarah",
      role: "Designer",
      content: "Amazing collection of stickers! Really helped with my project.",
      rating: 5,
    },
    {
      author: "John",
      role: "Artist",
      content: "Top quality stickers at competitive prices.",
      rating: 5,
    },
    {
      author: "Emma",
      role: "Content Creator",
      content: "Best sticker marketplace out there!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by Creators</h2>
          <p className="mt-4 text-lg text-muted-foreground">See what our community has to say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
