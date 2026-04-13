import { FiUsers, FiTarget, FiHeart, FiAward, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 dark:bg-primary/5 skew-y-3 origin-top-left -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-poppins font-black mb-8 dark:text-white"
            >
                Our <span className="text-primary italic">Flavor</span> Story
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl max-w-3xl mx-auto text-gray-500 font-medium leading-relaxed"
            >
                Bringing the world's most exquisite cuisines to your doorstep with love and speed since 2024.
            </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-[40px] blur-2xl transition-all" />
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" 
              alt="Team Kitchen" 
              className="relative rounded-[40px] shadow-2xl border-4 border-white dark:border-[#1A1A1A]"
            />
          </motion.div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-poppins font-black dark:text-white leading-tight">Elevating Every <br/> <span className="text-primary">Bite</span> You Take</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
              We started with a simple belief: that everyone deserves high-quality meals delivered with respect for time and taste. Over the years, we've transformed from a local startup to a premium platform.
            </p>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
              Our journey is fueled by a passion for culinary excellence and a commitment to building a seamless connection between the kitchen and your home.
            </p>
            <div className="grid grid-cols-2 gap-10 pt-8 border-t dark:border-white/5">
              <div className="space-y-1">
                <h4 className="text-5xl font-poppins font-black text-primary">50k+</h4>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Global Fans</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-5xl font-poppins font-black text-primary">120+</h4>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Master Chefs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-poppins font-black text-center mb-24 dark:text-white">The Foodie Edge</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AboutCard 
              icon={<FiHeart className="h-10 w-10" />}
              title="Culinary Love"
              desc="Every dish is prepared with passion and the finest local ingredients available."
            />
            <AboutCard 
              icon={<FiTarget className="h-10 w-10" />}
              title="Precision Delivery"
              desc="Our delivery partners follow optimized routes to ensure freshness and heat."
            />
            <AboutCard 
              icon={<FiAward className="h-10 w-10" />}
              title="Highest Standards"
              desc="We only partner with restaurants that pass our strict quality and hygiene audits."
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-poppins font-black dark:text-white mb-6">Meet the Visionaries</h2>
            <p className="text-gray-500 font-medium">The talented humans making it all happen behind the scenes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <TeamCard name="Alex Rivers" role="Founder & Visionary" img="https://i.pravatar.cc/300?u=red1" />
            <TeamCard name="Sarah Chen" role="Ops Alchemist" img="https://i.pravatar.cc/300?u=red2" />
            <TeamCard name="Marcus Joy" role="Kitchen Director" img="https://i.pravatar.cc/300?u=red3" />
            <TeamCard name="Elena Smith" role="Client Experience" img="https://i.pravatar.cc/300?u=red4" />
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="premium-card p-12 text-center group"
  >
    <div className="inline-block p-5 bg-primary/10 rounded-[24px] mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {icon}
    </div>
    <h3 className="text-2xl font-poppins font-black mb-4 dark:text-white uppercase tracking-tight">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{desc}</p>
  </motion.div>
);

const TeamCard = ({ name, role, img }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="text-center group"
  >
    <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-[32px] border-4 border-white dark:border-[#1A1A1A] shadow-xl transition-all group-hover:shadow-primary/20">
      <img src={img} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" />
    </div>
    <h4 className="font-poppins font-black text-2xl dark:text-white mb-1">{name}</h4>
    <p className="text-primary font-bold text-xs uppercase tracking-widest">{role}</p>
  </motion.div>
);

export default About;
