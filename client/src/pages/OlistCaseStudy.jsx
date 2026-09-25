import CaseStudyHeader from "../components/CaseStudyHeader";
import CaseStudySection from "../components/CaseStudySection";
import ChartImage from "../components/ChartImage";
import DataTable from "../components/DataTable";
import Navbar from "../components/Navbar";
import StatPlate from "../components/StatPlate";

import customerState from "../assets/images/olist/customer_state_distribution.png";
import dashboard1 from "../assets/images/olist/dashboard_screenshot1.png";
import dashboard2 from "../assets/images/olist/dashboard_screenshot2.png";
import deliveryDelay from "../assets/images/olist/delivery_delay_distribution.png";
import delayVsReview from "../assets/images/olist/delivery_delay_vs_review_score.png";
import monthlyRevenue from "../assets/images/olist/monthly_revenue_trend.png";
import reviewScore from "../assets/images/olist/review_score_distribution.png";
import topCategories from "../assets/images/olist/top_product_categories_revenue.png";

const OlistCaseStudy = () => {
  return (
    <div className="bg-paper min-h-screen">
      <div className="fixed top-4 right-4 z-50 bg-paper/95 backdrop-blur-sm border border-hairline rounded-xl shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <CaseStudyHeader
          eyebrow="data analytics case study"
          title="Olist E-Commerce Analytics"
          tagline="What 100,000 Brazilian orders reveal about revenue, loyalty, logistics, and the reviews that lie"
          techStack={[
            "SQL",
            "SQLite",
            "Python (pandas, matplotlib, seaborn)",
            "Power BI",
          ]}
          github="https://github.com/RohanMishra47/olist-ecommerce-analytics"
        />

        <CaseStudySection title="The problem">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed">
            Olist connects small Brazilian merchants to major marketplaces under
            a single contract. With operations spanning all 27 Brazilian states,
            thousands of sellers, and dozens of product categories, the business
            needed answers to four questions: where is revenue coming from, how
            loyal are customers, how reliable is the delivery network, and what
            actually drives satisfaction — using roughly 100,000 orders across 9
            relational tables spanning September 2016 to October 2018.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Approach">
          <ol className="space-y-3 text-base text-ink/90 max-w-prose list-decimal list-inside">
            <li>
              Built a SQLite database from 9 raw Kaggle CSVs — orders, items,
              customers, payments, reviews, products, sellers, geolocation, and
              category translations.
            </li>
            <li>
              Wrote business-question-driven SQL across sales, customers,
              logistics, and reviews.
            </li>
            <li>
              Cross-validated every SQL aggregation independently in pandas —
              every check matched exactly.
            </li>
            <li>
              Investigated two data-quality anomalies before trusting the
              numbers (see below), rather than reporting them at face value.
            </li>
            <li>
              Built a 2-page, 5-slicer interactive Power BI dashboard for
              stakeholder-facing exploration.
            </li>
          </ol>
        </CaseStudySection>

        <CaseStudySection title="Key numbers">
          <div>
            <StatPlate
              number="R$15.4M"
              label="Total GMV across 96,478 delivered orders"
            />
            <StatPlate
              number="41.92%"
              label="Of all orders come from São Paulo alone"
            />
            <StatPlate number="6.76%" label="Late delivery rate overall" />
            <StatPlate number="3.00%" label="Repeat purchase rate" />
            <StatPlate
              number="−0.27"
              label="Correlation: delivery delay vs. review score"
              negative
            />
          </div>
        </CaseStudySection>

        <CaseStudySection title="A data-quality finding worth flagging">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Hundreds of orders appeared to have been delivered 100–150 days{" "}
            <em>ahead</em> of schedule — physically impossible given normal 1–7
            day transit times. A sequential timestamp audit traced the anomaly
            entirely to{" "}
            <code className="font-mono text-sm bg-hairline/50 px-1 rounded">
              order_estimated_delivery_date
            </code>
            , not actual logistics: when carrier routing APIs failed at
            checkout, the platform silently defaulted to a 180-day worst-case
            estimate. These rows were excluded from all delay-based analysis and
            flagged for transparency rather than left in the numbers unexamined.
          </p>
          <ChartImage
            src={deliveryDelay}
            alt="Histogram showing the distribution of delivery delay in days, peaking just before zero"
            caption="Delivery delay distribution — the vast majority of orders arrive early or on time once the placeholder timestamps are excluded."
          />
        </CaseStudySection>

        <CaseStudySection title="Review scores are a noisy satisfaction signal">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            The review distribution is sharply bimodal — 57.78% five-star, with
            one-star (11.51%) as the <em>second</em> most common score, well
            ahead of 2, 3, and 4. A subset of orders received perfect 5-star
            ratings despite delays exceeding 100 days. Two drivers explain this:
            accidental taps on mobile (empty comment fields), and genuine
            satisfaction for high-tolerance product types (handmade, customized,
            or imported items) where seller communication decoupled delivery
            speed from final satisfaction.
          </p>
          <ChartImage
            src={reviewScore}
            alt="Bar chart of review score distribution showing 5-star dominant and 1-star as second most common"
            caption="Review score distribution — bimodal, not a smooth curve. Score alone isn't a reliable delivery-satisfaction proxy."
          />
          <ChartImage
            src={delayVsReview}
            alt="Scatter plot of delivery delay versus review score"
            caption="Delivery delay vs. review score (Pearson r = −0.27) — a real but modest relationship, since many other factors also shape a review."
          />
        </CaseStudySection>

        <CaseStudySection title="Revenue vs. volume tell different stories">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Watches & Gifts ranks #2 by revenue but only #7 by order volume — a
            high price-point, lower-frequency category, earning roughly 75% more
            per order than Bed, Bath & Table despite about half the transaction
            volume. A business optimizing for transaction count and one
            optimizing for revenue would prioritize entirely different
            categories.
          </p>
          <ChartImage
            src={topCategories}
            alt="Horizontal bar chart of top product categories by revenue"
            caption="Top product categories by revenue."
          />
          <ChartImage
            src={monthlyRevenue}
            alt="Line chart of monthly revenue trend from 2016 to 2018"
            caption="Monthly revenue trend — a near-zero pilot phase (2016), a steep ramp through 2017, and a stable plateau through 2018."
          />
        </CaseStudySection>

        <CaseStudySection title="Geographic concentration">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Brazil's e-commerce market is heavily concentrated in the Southeast:
            the top 3 states (SP, RJ, MG) account for 66.51% of all orders.
            Several northern and central-western states each contribute under
            0.1%.
          </p>
          <ChartImage
            src={customerState}
            alt="Horizontal bar chart of customer counts by Brazilian state, dominated by São Paulo"
            caption="Customer geographic distribution by state."
          />
        </CaseStudySection>

        <CaseStudySection title="Customer segmentation">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Customers were segmented via RFM (Recency, Frequency, Monetary)
            modeling. Because Olist operates as a marketplace with a 97%
            single-purchase rate, the segment distribution leans heavily on
            recency and spend rather than repeat behavior.
          </p>
          <DataTable
            headers={["Segment", "% of customers", "Count"]}
            rows={[
              ["At Risk", "23.54%", "21,980"],
              ["Lost Customers", "16.45%", "15,362"],
              ["Champions", "16.18%", "15,108"],
              ["Potential Loyalists", "15.73%", "14,683"],
              ["Loyal Customers", "8.19%", "7,649"],
              ["Recent / Need Attention", "15.71%", "14,662"],
              ["Others", "4.19%", "3,914"],
            ]}
          />
          <p className="text-base text-ink/90 max-w-prose leading-relaxed">
            Over 40% of the customer base sits in "At Risk" or "Lost" segments —
            confirming that marketplace growth is currently driven almost
            entirely by new customer acquisition rather than retention.
          </p>
        </CaseStudySection>

        <CaseStudySection title="The dashboard">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            The final deliverable was a 2-page Power BI report with 5
            cross-filtering slicers (date range, customer state, product
            category, RFM segment, shipping type), built for stakeholders to
            explore without needing to write a query.
          </p>
          <ChartImage
            src={dashboard1}
            alt="Power BI dashboard screenshot showing executive sales and revenue overview"
            caption="Executive Sales & Revenue Overview page."
          />
          <ChartImage
            src={dashboard2}
            alt="Power BI dashboard screenshot showing customer and operational insights"
            caption="Customer & Operational Insights page."
          />
        </CaseStudySection>
      </div>
    </div>
  );
};

export default OlistCaseStudy;
