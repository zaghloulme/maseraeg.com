import Hero from '@/components/modules/Hero'
import { type Section } from '@/lib/cms/types/schema'

// Import other sections here as we build them.
// For now, we manually inline a basic Features component or assume it exists.
// Since we don't have a standalone Features component yet, I'll inline a simple one or reference it if I created it.
// Wait, the plan was to reuse existing. I'll create a Features component or render inline.
// Let's create a cleaner structure and assume Features component exists or build it now.
// For this step, I'll create a simple inline Features renderer or separate file.
// Let's stick to the plan: "Switches on _type to render generic components".

// Temporary Features component until we extract it properly if it doesn't exist
import { type FeaturesSection } from '@/lib/cms/types/schema'

const Features = ({ data }: { data: FeaturesSection }) => (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
            {data.title && <h2 className="text-3xl font-bold text-center mb-12">{data.title}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.items.map((item, index) => (
                    <div key={index} className="p-6 bg-card rounded-lg shadow-sm border border-border">
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
)

export default function SectionRenderer({ sections }: { sections: Section[] }) {
    if (!sections) return null

    return (
        <>
            {sections.map((section) => {
                switch (section._type) {
                    case 'hero':
                        return <Hero key={section._key} data={section} />
                    case 'features':
                        return <Features key={section._key} data={section} />
                    default:
                        return null
                }
            })}
        </>
    )
}
