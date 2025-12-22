import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/* ---------------- ICONS ---------------- */

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H24v8h11.303C33.654 32.74 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.344 4.337-17.694 10.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
);

/* ---------------- HELPERS ---------------- */

const GlassInputWrapper = ({ children }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
    {children}
  </div>
);

const TestimonialCard = ({ data, delay }) => (
  <div
    className={`opacity-0 translate-y-4 scale-95 ${delay} animate-testimonial flex gap-3 rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 p-5 w-64`}
  >
    <img
      src={data.avatarSrc}
      className="h-10 w-10 rounded-2xl object-cover"
      alt="avatar"
    />
    <div className="text-sm">
      <p className="font-medium">{data.name}</p>
      <p className="text-muted-foreground">{data.handle}</p>
      <p className="mt-1 text-foreground/80">{data.text}</p>
    </div>
  </div>
);

/* ---------------- MAIN PAGE ---------------- */

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const testimonials = [
    {
      avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
      name: "Sarah Chen",
      handle: "@sarahdigital",
      text: "Amazing platform! The experience is seamless."
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
      name: "Marcus Johnson",
      handle: "@marcustech",
      text: "Clean design, powerful features."
    },
    {
      avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "David Martinez",
      handle: "@davidcreates",
      text: "Reliable and intuitive platform."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log("Login Data:", data);
    alert("Login submitted — check console");
  };

  return (
    <>
      {/* INLINE ANIMATIONS (NO EXTERNAL CSS) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
      .animate-fade {
        opacity: 0;
        transform: translateY(16px);
        animation: fadeIn 0.6s forwards;
      }

      .animate-slide {
        opacity: 0;
        transform: translateX(24px);
        animation: slideRight 0.7s forwards;
      }

      .animate-testimonial {
        opacity: 0;
        transform: translateY(16px) scale(0.95);
        animation: testimonialIn 0.6s forwards;
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideRight {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes testimonialIn {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `,
        }}
      />


      <div className="h-screen w-screen flex flex-col md:flex-row bg-background text-foreground">
        {/* LEFT */}
        <section className="flex-1 flex items-center justify-center p-8">
          <div className="text-white max-w-md w-full space-y-6">
            <h1 className="text-4xl font-semibold animate-fade opacity-0 translate-y-4">
              Welcome
            </h1>
            <p className="text-muted-foreground animate-fade opacity-0 translate-y-4 delay-100">
              Access your account and continue your journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground">
                  Email Address
                </label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent p-4 text-sm outline-none"
                    placeholder="Enter email"
                  />
                </GlassInputWrapper>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Password
                </label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full bg-transparent p-4 pr-12 text-sm outline-none"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              <button className="w-full bg-primary text-primary-foreground rounded-2xl py-4">
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-border" />
              <span className="text-sm text-muted-foreground">
                Or continue with
              </span>
              <div className="flex-1 border-t border-border" />
            </div>

            <button className="w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4">
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </section>

        {/* RIGHT */}
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="absolute inset-4 rounded-3xl bg-cover bg-center opacity-0 translate-x-6 animate-slide"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160)"
            }}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <TestimonialCard data={testimonials[0]} delay="delay-200" />
            <TestimonialCard data={testimonials[1]} delay="delay-300" />
            <TestimonialCard data={testimonials[2]} delay="delay-500" />
          </div>
        </section>
      </div>
    </>
  );
}
