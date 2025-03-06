# HeyZack Kickstarter Campaign KPI Definitions

## Campaign Performance Metrics

### Funding Progress
- **Definition**: Total amount pledged toward the campaign goal
- **Formula**: Sum of all backer pledges
- **Target**: $1,000,000
- **Reporting Frequency**: Real-time
- **Visualization**: Progress bar + daily trend line
- **Data Source**: Kickstarter API

### Backer Count
- **Definition**: Total number of unique backers
- **Formula**: Count of unique backer IDs
- **Target**: 2,000 backers
- **Reporting Frequency**: Real-time
- **Visualization**: Counter + daily trend line
- **Data Source**: Kickstarter API

### Average Pledge Amount
- **Definition**: Average amount pledged per backer
- **Formula**: Total pledged amount / Number of backers
- **Target**: $500
- **Reporting Frequency**: Real-time
- **Visualization**: Number + daily trend line
- **Data Source**: Calculated

### Conversion Rate
- **Definition**: Percentage of page visitors who become backers
- **Formula**: (Number of backers / Number of page views) × 100
- **Target**: >5%
- **Reporting Frequency**: Daily
- **Visualization**: Percentage + daily trend line
- **Data Source**: Kickstarter + Google Analytics

### Funding Velocity
- **Definition**: Rate at which the campaign is being funded
- **Formula**: Amount pledged in last 24 hours
- **Target**: >$33,333/day (to reach $1M in 30 days)
- **Reporting Frequency**: Hourly
- **Visualization**: Speedometer gauge + hourly trend line
- **Data Source**: Calculated

## Reward Tier Metrics

### Tier Distribution
- **Definition**: Breakdown of backers by reward tier
- **Formula**: Count and percentage of backers per tier
- **Target**: 40% Starter Kit, 40% Advanced Kit, 20% Ultimate Kit
- **Reporting Frequency**: Daily
- **Visualization**: Pie chart + bar chart
- **Data Source**: Kickstarter API

### Tier Conversion Rate
- **Definition**: Conversion rate for each reward tier
- **Formula**: (Number of tier backers / Number of tier page views) × 100
- **Target**: >5% for each tier
- **Reporting Frequency**: Daily
- **Visualization**: Bar chart comparing tiers
- **Data Source**: Kickstarter + Google Analytics

### Add-on Attachment Rate
- **Definition**: Percentage of backers who select add-ons
- **Formula**: (Number of backers with add-ons / Total backers) × 100
- **Target**: >25%
- **Reporting Frequency**: Daily
- **Visualization**: Percentage + trend line
- **Data Source**: Kickstarter API

## Marketing & Traffic Metrics

### Traffic Sources
- **Definition**: Breakdown of campaign page traffic by source
- **Formula**: Count and percentage of visitors by referral source
- **Target**: Diverse mix with >30% from targeted marketing
- **Reporting Frequency**: Daily
- **Visualization**: Pie chart + table with trends
- **Data Source**: Google Analytics

### Social Media Engagement
- **Definition**: Engagement with campaign-related social media content
- **Formula**: Sum of likes, shares, comments, and clicks across platforms
- **Target**: >10,000 engagements
- **Reporting Frequency**: Daily
- **Visualization**: Platform comparison bar chart + trend line
- **Data Source**: Social media analytics APIs

### Email Campaign Performance
- **Definition**: Effectiveness of email marketing campaigns
- **Formula**: Open rate, click-through rate, and conversion rate
- **Target**: >30% open rate, >5% CTR, >2% conversion
- **Reporting Frequency**: Per campaign
- **Visualization**: Campaign comparison table
- **Data Source**: Email marketing platform API

### PR Mentions
- **Definition**: Media coverage of the campaign
- **Formula**: Count of articles, blog posts, and mentions
- **Target**: >50 mentions
- **Reporting Frequency**: Daily
- **Visualization**: Count + source quality breakdown
- **Data Source**: Manual tracking + media monitoring tools

## Community Metrics

### Comment Activity
- **Definition**: Engagement in campaign comments section
- **Formula**: Number of comments and replies
- **Target**: >500 comments
- **Reporting Frequency**: Daily
- **Visualization**: Daily comment count + sentiment analysis
- **Data Source**: Kickstarter API

### Response Time
- **Definition**: Average time to respond to backer questions
- **Formula**: Average time between question and team response
- **Target**: <4 hours during business hours
- **Reporting Frequency**: Daily
- **Visualization**: Average time + trend line
- **Data Source**: Manual tracking

### Sentiment Analysis
- **Definition**: Tone and sentiment of backer comments and social mentions
- **Formula**: Percentage of positive, neutral, and negative mentions
- **Target**: >80% positive/neutral
- **Reporting Frequency**: Daily
- **Visualization**: Sentiment breakdown pie chart + trend line
- **Data Source**: NLP analysis of comments and mentions

## Financial Metrics

### Estimated Profit Margin
- **Definition**: Projected profit based on current backer mix
- **Formula**: (Total pledged - Estimated costs) / Total pledged × 100
- **Target**: >30%
- **Reporting Frequency**: Daily
- **Visualization**: Percentage + trend line
- **Data Source**: Calculated based on cost models

### Cost Per Acquisition (CPA)
- **Definition**: Marketing spend per acquired backer
- **Formula**: Total marketing spend / Number of backers
- **Target**: <$20 per backer
- **Reporting Frequency**: Weekly
- **Visualization**: CPA by channel bar chart
- **Data Source**: Marketing expense tracking + Kickstarter

### Return on Ad Spend (ROAS)
- **Definition**: Revenue generated per dollar of advertising spend
- **Formula**: Revenue from ad channel / Spend on that channel
- **Target**: >5:1 ROAS
- **Reporting Frequency**: Weekly
- **Visualization**: ROAS by channel bar chart
- **Data Source**: Ad platform analytics + attribution tracking

## Post-Campaign Planning Metrics

### Manufacturing Readiness
- **Definition**: Progress toward manufacturing readiness
- **Formula**: Percentage of manufacturing preparation tasks completed
- **Target**: 100% by campaign end
- **Reporting Frequency**: Weekly
- **Visualization**: Progress bar + task breakdown
- **Data Source**: Project management system

### Stretch Goal Progress
- **Definition**: Progress toward stretch goal funding thresholds
- **Formula**: Percentage of next stretch goal target reached
- **Target**: 100% for each stretch goal
- **Reporting Frequency**: Real-time
- **Visualization**: Progress bars for each stretch goal
- **Data Source**: Calculated

### Backer Survey Completion
- **Definition**: Percentage of backers who have completed post-campaign surveys
- **Formula**: (Surveys completed / Total backers) × 100
- **Target**: >95%
- **Reporting Frequency**: Daily during survey period
- **Visualization**: Completion percentage + daily responses
- **Data Source**: Survey platform API

## Dashboard Implementation

### Data Refresh Rates
- Real-time metrics: Updated every 5 minutes
- Daily metrics: Updated at midnight UTC
- Weekly metrics: Updated Mondays at midnight UTC

### Access Levels
- **Executive View**: All metrics with high-level summaries
- **Marketing View**: Focused on traffic, conversion, and engagement metrics
- **Community View**: Focused on backer interactions and sentiment
- **Financial View**: Focused on revenue, costs, and profitability

### Alert Thresholds
- Funding velocity drops below target for 48 hours
- Conversion rate drops below 3% for 24 hours
- Negative sentiment exceeds 30% for 24 hours
- Response time exceeds 8 hours
