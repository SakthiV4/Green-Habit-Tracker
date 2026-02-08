import { Leaf, Twitter, Github, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="border-t border-neutral-dark/5 py-8 mt-auto backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand & Copyright */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-main p-1.5 rounded-lg text-white">
                                <Leaf size={16} />
                            </div>
                            <span className="text-lg font-display font-bold text-primary-deep">EcoTrack</span>
                        </div>
                        <p className="text-neutral-mid text-sm hidden md:block">
                            © {new Date().getFullYear()}
                        </p>
                    </div>

                    {/* Compact Links */}
                    <div className="flex gap-6 text-sm font-medium text-neutral-mid">
                        {['Dashboard', 'Calculator', 'Challenges', 'Swaps'].map((item) => (
                            <a key={item} href="#" className="hover:text-primary-main transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        {[Twitter, Github, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="text-neutral-mid hover:text-primary-main transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
