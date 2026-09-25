import CaseStudyHeader from "../components/CaseStudyHeader";
import CaseStudySection from "../components/CaseStudySection";
import DataTable from "../components/DataTable";
import Navbar from "../components/Navbar";

const DiagramBox = ({ label, sub, accent = false }) => (
  <div
    className={`border rounded-md px-4 py-3 text-center ${
      accent ? "border-pine bg-pine/5" : "border-hairline"
    }`}
  >
    <div className="font-mono text-sm text-ink">{label}</div>
    {sub && <div className="text-xs text-graphite mt-1">{sub}</div>}
  </div>
);

const Arrow = () => (
  <div className="flex justify-center py-2">
    <div className="w-px h-6 bg-hairline" />
  </div>
);

const VortexPage = () => {
  return (
    <div className="bg-paper min-h-screen">
      <div className="fixed top-4 right-4 z-50 bg-paper/95 backdrop-blur-sm border border-hairline rounded-xl shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <CaseStudyHeader
          eyebrow="featured engineering project"
          title="Vortex — Geographically Distributed URL Shortener"
          tagline="Sub-50ms redirects at the edge, with real-time analytics that don't slow down the click"
          techStack={[
            "Next.js",
            "TypeScript",
            "Vercel Edge Functions",
            "PostgreSQL",
            "Prisma",
            "Upstash Redis",
            "Upstash QStash",
          ]}
          github="https://github.com/RohanMishra47/vortex"
          live="https://vortex-pi-beige.vercel.app/"
        />

        <CaseStudySection title="The problem">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed">
            Build a URL shortener that redirects fast globally, without a
            central-server bottleneck, while still capturing detailed click
            analytics — geography, device, browser, referrer — without that
            tracking slowing down the redirect itself.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-6">
            Redirects run on Vercel Edge Functions at the nearest data center:
            check Redis cache first, fall back to PostgreSQL, and queue
            analytics asynchronously so click-tracking never blocks the
            redirect.
          </p>

          <div className="max-w-md mx-auto">
            <DiagramBox label="User clicks a short link" />
            <Arrow />
            <DiagramBox
              label="Edge Function (nearest region)"
              sub="checks Redis cache"
              accent
            />
            <Arrow />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <DiagramBox
                  label="Cache hit"
                  sub="instant redirect, <50ms"
                  accent
                />
              </div>
              <div>
                <DiagramBox label="Cache miss" sub="fallback to PostgreSQL" />
              </div>
            </div>
            <Arrow />
            <DiagramBox
              label="Analytics queued (QStash)"
              sub="non-blocking, off the critical path"
            />
            <Arrow />
            <DiagramBox
              label="Click data saved to PostgreSQL"
              sub="1-2 seconds later"
            />
          </div>
        </CaseStudySection>

        <CaseStudySection title="Key decisions">
          <ul className="space-y-3 text-base text-ink/90 max-w-prose list-disc list-inside">
            <li>
              Cache-first (Redis) architecture with PostgreSQL fallback — keeps
              the hot path fast without sacrificing durability.
            </li>
            <li>
              Non-blocking, queued analytics writes so tracking never adds
              latency to the user-facing redirect.
            </li>
            <li>
              Bot traffic filtered automatically (isbot) to keep analytics
              meaningful.
            </li>
            <li>IP addresses hashed (SHA-256) before storage for privacy.</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Performance">
          <DataTable
            headers={["Metric", "Value"]}
            rows={[
              ["Redirect time (cached)", "10-50ms"],
              ["Redirect time (uncached)", "100-200ms"],
              ["Analytics processing", "1-2 seconds (background)"],
              ["Dashboard load time", "< 2 seconds"],
            ]}
          />
        </CaseStudySection>
      </div>
    </div>
  );
};

export default VortexPage;
