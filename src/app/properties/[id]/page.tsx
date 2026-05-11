"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  MapPin,
  Check,
  Send,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Star,
  ExternalLink,
} from "lucide-react";
import { propertyData, agentsData } from "@/lib/constants";
import { formatPrice, formatArea, propertyTypeLabels } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import PropertyCard from "@/components/properties/PropertyCard";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const property = propertyData.find((p) => p.id === params.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);
  const [mortgageDown, setMortgageDown] = useState(20);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Property Not Found</h1>
          <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  const agent = agentsData[0];
  const allImages = [property.featuredImage, ...property.images.filter((i) => i !== property.featuredImage)];

  const monthlyPayment = useMemo(() => {
    const principal = property.price * (1 - mortgageDown / 100);
    const monthlyRate = mortgageRate / 100 / 12;
    const numPayments = mortgageTerm * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  }, [property.price, mortgageRate, mortgageTerm, mortgageDown]);

  const similar = propertyData.filter((p) => p.id !== property.id && (p.type === property.type || p.location.city === property.location.city)).slice(0, 3);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <main className="min-h-screen">
      <div className="container-luxury pt-28 pb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <section className="container-luxury pb-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="aspect-[16/10] relative">
                <img
                  src={`https://images.unsplash.com/${allImages[selectedImage]}&w=1200&h=750&fit=crop`}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setSelectedImage((p) => (p === 0 ? allImages.length - 1 : p - 1))}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold-400 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((p) => (p === allImages.length - 1 ? 0 : p + 1))}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-gold-400 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? "border-gold-500" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={`https://images.unsplash.com/${img}&w=160&h=120&fit=crop`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="gold">{propertyTypeLabels[property.type]}</Badge>
                    {property.isLuxury && <Badge variant="white">Luxury</Badge>}
                  </div>
                  <h1 className="text-2xl font-bold text-white">{property.title}</h1>
                </div>
              </div>
              <div className="text-3xl font-bold gold-gradient font-num">
                {formatPrice(property.price)}
                {property.purpose === "rent" && <span className="text-sm text-white/40">/mo</span>}
              </div>
              <div className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {property.location.address}, {property.location.city}, {property.location.state}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                {[
                  { icon: Bed, label: "Bedrooms", value: property.bedrooms },
                  { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                  { icon: Maximize2, label: "Area", value: formatArea(property.area, property.areaUnit) },
                  { icon: Calendar, label: "Year Built", value: property.yearBuilt },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{item.label}</p>
                      <p className="text-sm font-medium text-white font-num">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Schedule a Viewing</h3>
              {formSent ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <p className="text-white font-medium">Inquiry Sent!</p>
                  <p className="text-sm text-white/40 mt-1">We will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={formState.phone}
                    onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full bg-transparent border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 resize-none"
                  />
                  <Button type="submit" variant="gold" className="w-full" icon={<Send className="w-4 h-4" />}>
                    Send Inquiry
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                <p className="text-white/60 leading-relaxed">{property.description}</p>
              </div>

              {property.features.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <span className="text-sm text-white/70">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.amenities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Amenities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        <span className="text-sm text-white/70">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {property.nearbyPlaces.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Nearby Places</h2>
                  <div className="space-y-3">
                    {property.nearbyPlaces.map((place) => (
                      <div key={place.name} className="flex items-center justify-between py-3 px-4 rounded-lg glass">
                        <div>
                          <p className="text-sm font-medium text-white">{place.name}</p>
                          <p className="text-xs text-white/40 capitalize">{place.type}</p>
                        </div>
                        <span className="text-xs text-gold-400">{place.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-white mb-4">Location</h2>
                <div className="rounded-xl overflow-hidden h-[300px]">
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=&q=${property.location.coordinates.lat},${property.location.coordinates.lng}&center=${property.location.coordinates.lat},${property.location.coordinates.lng}&zoom=15`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassCard className="p-6 text-center">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                <p className="text-sm text-gold-400 mb-3">{agent.title}</p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  <span className="text-sm text-white/70">
                    {agent.rating} ({agent.reviewCount} reviews)
                  </span>
                </div>
                <div className="space-y-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-white/10 text-sm text-white/70 hover:text-gold-400 hover:border-gold-400/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-white/10 text-sm text-white/70 hover:text-gold-400 hover:border-gold-400/30 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {agent.email}
                  </a>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-gold-400" />
                  <h3 className="text-lg font-semibold text-white">Mortgage Calculator</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/40 block mb-1">Interest Rate ({mortgageRate}%)</label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="0.1"
                      value={mortgageRate}
                      onChange={(e) => setMortgageRate(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-1">Term ({mortgageTerm} years)</label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="5"
                      value={mortgageTerm}
                      onChange={(e) => setMortgageTerm(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 block mb-1">Down Payment ({mortgageDown}%)</label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={mortgageDown}
                      onChange={(e) => setMortgageDown(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-xs text-white/40 mb-1">Estimated Monthly Payment</p>
                    <p className="text-2xl font-bold gold-gradient font-num">
                      {formatPrice(Math.round(monthlyPayment))}
                    </p>
                    <p className="text-xs text-white/30 mt-1 font-num">
                      {formatPrice(property.price * (1 - mortgageDown / 100))} at {mortgageRate}% over {mortgageTerm} years
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container-luxury">
            <SectionHeading
              title="Similar Properties"
              subtitle="You might also be interested in these luxury properties."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
