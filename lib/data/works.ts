export interface Work {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const works: Work[] = [
  {
    id: "1",
    slug: "imuya-2024-football-sponsorship",
    title: "LikeMinds Co-Sponsors the IMUYA 2024 Football Tournament",
    date: "2024",
    content: `
LikeMinds 1980–1986 Nomeh Unateze Community Development Association marked a proud milestone in 2024 by co-sponsoring the **IMUYA 2024 Football Tournament** — the maiden outing of one of the most eagerly anticipated inter-community sporting events in the Nomeh Unateze axis.

## A Historic Co-Sponsorship

The IMUYA 2024 Football Tournament was a landmark occasion, bringing together young men and women from across Nomeh Unateze in a spirited display of athleticism, brotherhood, and community pride. LikeMinds was honoured to stand as a co-sponsor of this inaugural event, recognising sport as a powerful vehicle for unity, youth engagement, and community identity.

The tournament drew large crowds, ignited fierce but friendly competition, and left a lasting impression on all who participated and watched. For LikeMinds, it was more than a sporting event — it was a statement of commitment to the youth and the future of Nomeh Unateze.

## Looking Ahead to 2026

Inspired by the success of IMUYA 2024, LikeMinds is actively planning to deepen its investment in the Nomeh Unateze community with a series of impactful initiatives slated for 2026. These include:

- **Continued sponsorship** of IMUYA and other community sporting and cultural events
- **Scholarship awards** for academically outstanding students from Nomeh Unateze who require financial support to pursue higher education
- **Youth empowerment programmes** aimed at equipping young people with vocational skills and entrepreneurial capacity
- **Community welfare initiatives** to support widows, the elderly, and vulnerable households

LikeMinds remains steadfast in its mission: to honour the bonds forged between 1980 and 1986 through meaningful, lasting contributions to the community that shaped us. Every event co-sponsored, every scholarship awarded, and every initiative undertaken is a reaffirmation of our collective vow — *Ofu Obi Umunwanne*.
    `.trim(),
  },
];

export const getWorkBySlug = (slug: string) => works.find((w) => w.slug === slug);
