import CaseStudyHeader from "../components/CaseStudyHeader";
import CaseStudySection from "../components/CaseStudySection";
import ChartImage from "../components/ChartImage";
import DataTable from "../components/DataTable";
import Navbar from "../components/Navbar";
import StatPlate from "../components/StatPlate";

import ratingDist from "../assets/images/ott/chart1_rating_distribution.png";
import platformContent from "../assets/images/ott/chart2_platform_content.png";
import genrePopularity from "../assets/images/ott/chart3_genre_popularity.png";
import ratingByGenre from "../assets/images/ott/chart4_rating_by_genre.png";
import yearlyTrend from "../assets/images/ott/chart5_yearly_trend.png";
import platformEngagement from "../assets/images/ott/chart6_platform_engagement.png";
import ratingVsPopularity from "../assets/images/ott/chart7_rating_vs_popularity.png";
import correlationHeatmap from "../assets/images/ott/chart8_correlation_heatmap.png";
import dashboardPreview from "../assets/images/ott/dashboard_preview.png";

const OttCaseStudy = () => {
  return (
    <div className="bg-paper min-h-screen">
      <div className="fixed top-4 right-4 z-50 bg-paper/95 backdrop-blur-sm border border-hairline rounded-xl shadow-sm">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        <CaseStudyHeader
          eyebrow="data analytics case study"
          title="OTT Streaming Platform Analytics"
          tagline="Why the highest-rated titles aren't the most popular — and what that means for content strategy"
          techStack={[
            "SQL",
            "SQLite",
            "Python (pandas, matplotlib, seaborn)",
            "Power BI",
          ]}
          github="https://github.com/RohanMishra47/ott-streaming-analytics"
        />

        <CaseStudySection title="The problem">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed">
            Analyze 2,500 streaming titles across Netflix, Prime Video, and
            Hotstar to uncover patterns in content quality, platform strategy,
            audience engagement, and genre performance — moving from raw SQL
            through Python EDA into a stakeholder-facing Power BI dashboard.
          </p>
        </CaseStudySection>

        <CaseStudySection title="Approach">
          <ol className="space-y-3 text-base text-ink/90 max-w-prose list-decimal list-inside">
            <li>
              Built a SQLite database from a cleaned dataset of 2,500 titles, 19
              attributes, zero missing values.
            </li>
            <li>
              Ran business-question SQL queries, then reproduced key
              aggregations independently in pandas — every cross-check matched.
            </li>
            <li>
              Used Pearson correlation across all numeric metrics, then followed
              up with scatter-plot visual inspection where the correlation
              coefficient alone was misleading.
            </li>
            <li>
              Built a Power BI dashboard with genre and yearly-trend visuals
              modeled to aggregate live from row-level data, so every visual
              responds correctly to slicers.
            </li>
          </ol>
        </CaseStudySection>

        <CaseStudySection title="Key numbers">
          <div>
            <StatPlate
              number="r = 0.18"
              label="Correlation between rating and popularity"
            />
            <StatPlate
              number="0.727"
              label="Netflix's engagement-to-popularity efficiency ratio"
            />
            <StatPlate
              number="14.9%"
              label="Largest genre's vote share (Sci-Fi) — nearly even split"
            />
            <StatPlate
              number="+0.10"
              label="2024's year-over-year rating jump"
            />
          </div>
        </CaseStudySection>

        <CaseStudySection title="Rating sets a ceiling, not a driver">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            The most counterintuitive finding in the project: rating and
            popularity are almost statistically unrelated (r = 0.18) across all
            2,500 titles. But the relationship isn't nothing — plotting rating
            against popularity reveals a ceiling effect: at a rating of 5.0, no
            title exceeds roughly 1,000 popularity points; at 9.0+, the ceiling
            rises to nearly 1,800. Quality doesn't guarantee an audience, but it
            unlocks a higher possible one. That nuance would be invisible from
            the correlation number alone.
          </p>
          <ChartImage
            src={ratingVsPopularity}
            alt="Scatter plot of rating versus popularity score colored by platform, showing a rising ceiling"
            caption="Rating vs. popularity — weak overall correlation, but a visible ceiling effect at the top end."
          />
          <ChartImage
            src={correlationHeatmap}
            alt="Correlation heatmap of rating, votes, weighted rating, engagement, popularity, and trending score"
            caption="Correlation heatmap — rating and weighted rating form an isolated cluster, decoupled from the votes/popularity/trending cluster."
          />
          <ChartImage
            src={ratingDist}
            alt="Histogram of content ratings with a mean line at 7.49"
            caption="Distribution of content ratings across all 2,500 titles."
          />
        </CaseStudySection>

        <CaseStudySection title="Platform strategy diverges under the surface">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Prime Video has the most content and the highest average engagement
            — but also the lowest average rating and the lowest
            engagement-to-popularity efficiency of the three platforms.
            Netflix's smaller, more consistent library converts engagement into
            popularity most efficiently.
          </p>
          <DataTable
            headers={[
              "Platform",
              "Total titles",
              "Avg rating",
              "Avg engagement",
              "Efficiency ratio",
            ]}
            rows={[
              ["Netflix", "824", "7.53", "1,023.76", "0.727 (best)"],
              ["Hotstar", "824", "7.44", "1,073.65", "0.705"],
              ["Prime Video", "852", "7.49", "1,116.59", "0.664 (worst)"],
            ]}
          />
          <ChartImage
            src={platformEngagement}
            alt="Boxplot of engagement score distribution by platform"
            caption="Engagement score distribution — Prime Video's boxplot is visibly taller with longer whiskers, meaning its content swings between huge hits and largely-ignored titles."
          />
          <ChartImage
            src={platformContent}
            alt="Bar chart of total content count by platform"
            caption="Total content count by platform."
          />
        </CaseStudySection>

        <CaseStudySection title="Genre landscape is structurally flat">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Comedy is the most popular genre by average popularity score despite
            being only the 5th largest by volume — platforms aren't producing
            the most popular genre in the highest quantity. More surprising:
            genre vote share is almost perfectly even across all 7 genres, the
            opposite of a Pareto distribution. Sci-Fi and Action have the
            tightest rating spread (most consistent quality); Crime has the
            widest.
          </p>
          <ChartImage
            src={genrePopularity}
            alt="Horizontal bar chart of average popularity score by genre, Comedy leading"
            caption="Average popularity score by genre — Comedy leads despite modest volume."
          />
          <ChartImage
            src={ratingByGenre}
            alt="Boxplot of rating distribution by genre showing interquartile ranges"
            caption="Rating distribution by genre — Sci-Fi and Action show the tightest IQR, Crime the widest."
          />
        </CaseStudySection>

        <CaseStudySection title="A two-year quality dip, then recovery">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            Content volume stayed stable year over year, but quality didn't move
            in a straight line — average rating declined for two consecutive
            years (2022–2023) before 2024 produced the sharpest single-year
            movement in the dataset: rating and volume both hit all-time highs
            simultaneously.
          </p>
          <ChartImage
            src={yearlyTrend}
            alt="Combination bar and line chart of yearly content volume versus average rating from 2018 to 2024"
            caption="Yearly content volume vs. average rating, 2018–2024."
          />
        </CaseStudySection>

        <CaseStudySection title="The dashboard">
          <p className="text-base text-ink/90 max-w-prose leading-relaxed mb-4">
            The Power BI dashboard's genre and yearly-trend visuals were
            deliberately modeled to aggregate live from row-level data rather
            than pre-aggregated summary tables, after diagnosing a
            filter-propagation issue during development — so every slicer
            (platform, genre, year) filters correctly.
          </p>
          <ChartImage
            src={dashboardPreview}
            alt="Power BI dashboard preview showing OTT platform performance overview with KPI cards and charts"
            caption="OTT Platform Performance Dashboard overview."
          />
        </CaseStudySection>
      </div>
    </div>
  );
};

export default OttCaseStudy;
