// =============================================================================
// RSS Feed Generator
// =============================================================================
// RSS feeds help with:
// - Google News indexing
// - Podcast directories
// - Feed readers (still popular!)
// - Automated content distribution

export interface FeedItem {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  guid?: string;
  author?: string;
  categories?: string[];
  content?: string; // Full HTML content
  enclosure?: {
    url: string;
    type: string; // e.g., "audio/mpeg", "video/mp4"
    length: number; // bytes
  };
}

export interface FeedConfig {
  title: string;
  description: string;
  siteUrl: string;
  feedUrl: string;
  language?: string;
  copyright?: string;
  managingEditor?: string;
  webMaster?: string;
  lastBuildDate?: Date;
  ttl?: number; // Time to live in minutes
  image?: {
    url: string;
    title: string;
    link: string;
    width?: number;
    height?: number;
  };
  // iTunes-specific (for podcasts)
  itunes?: {
    author: string;
    summary: string;
    explicit: boolean;
    owner: {
      name: string;
      email: string;
    };
    image: string;
    categories: string[];
  };
}

// =============================================================================
// RSS 2.0 Generator
// =============================================================================

export function generateRSS(config: FeedConfig, items: FeedItem[]): string {
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const formatDate = (date: Date): string => {
    return date.toUTCString();
  };

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"${config.itunes ? ' xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"' : ""}>
  <channel>
    <title>${escapeXml(config.title)}</title>
    <description>${escapeXml(config.description)}</description>
    <link>${config.siteUrl}</link>
    <atom:link href="${config.feedUrl}" rel="self" type="application/rss+xml"/>
    <language>${config.language || "en-us"}</language>
    <lastBuildDate>${formatDate(config.lastBuildDate || new Date())}</lastBuildDate>`;

  if (config.copyright) {
    rss += `\n    <copyright>${escapeXml(config.copyright)}</copyright>`;
  }

  if (config.managingEditor) {
    rss += `\n    <managingEditor>${escapeXml(config.managingEditor)}</managingEditor>`;
  }

  if (config.webMaster) {
    rss += `\n    <webMaster>${escapeXml(config.webMaster)}</webMaster>`;
  }

  if (config.ttl) {
    rss += `\n    <ttl>${config.ttl}</ttl>`;
  }

  if (config.image) {
    rss += `
    <image>
      <url>${config.image.url}</url>
      <title>${escapeXml(config.image.title)}</title>
      <link>${config.image.link}</link>
      ${config.image.width ? `<width>${config.image.width}</width>` : ""}
      ${config.image.height ? `<height>${config.image.height}</height>` : ""}
    </image>`;
  }

  // iTunes tags for podcasts
  if (config.itunes) {
    rss += `
    <itunes:author>${escapeXml(config.itunes.author)}</itunes:author>
    <itunes:summary>${escapeXml(config.itunes.summary)}</itunes:summary>
    <itunes:explicit>${config.itunes.explicit ? "yes" : "no"}</itunes:explicit>
    <itunes:owner>
      <itunes:name>${escapeXml(config.itunes.owner.name)}</itunes:name>
      <itunes:email>${config.itunes.owner.email}</itunes:email>
    </itunes:owner>
    <itunes:image href="${config.itunes.image}"/>`;

    config.itunes.categories.forEach((cat) => {
      rss += `\n    <itunes:category text="${escapeXml(cat)}"/>`;
    });
  }

  // Items
  items.forEach((item) => {
    rss += `
    <item>
      <title>${escapeXml(item.title)}</title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid || item.link}</guid>
      <pubDate>${formatDate(item.pubDate)}</pubDate>`;

    if (item.author) {
      rss += `\n      <author>${escapeXml(item.author)}</author>`;
    }

    if (item.categories) {
      item.categories.forEach((cat) => {
        rss += `\n      <category>${escapeXml(cat)}</category>`;
      });
    }

    if (item.content) {
      rss += `\n      <content:encoded><![CDATA[${item.content}]]></content:encoded>`;
    }

    if (item.enclosure) {
      rss += `\n      <enclosure url="${item.enclosure.url}" type="${item.enclosure.type}" length="${item.enclosure.length}"/>`;
    }

    rss += `
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  return rss;
}

// =============================================================================
// Atom Feed Generator
// =============================================================================

export function generateAtom(config: FeedConfig, items: FeedItem[]): string {
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const formatDate = (date: Date): string => {
    return date.toISOString();
  };

  let atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(config.title)}</title>
  <subtitle>${escapeXml(config.description)}</subtitle>
  <link href="${config.siteUrl}"/>
  <link href="${config.feedUrl}" rel="self"/>
  <id>${config.siteUrl}/</id>
  <updated>${formatDate(config.lastBuildDate || new Date())}</updated>`;

  if (config.managingEditor) {
    atom += `
  <author>
    <name>${escapeXml(config.managingEditor)}</name>
  </author>`;
  }

  // Entries
  items.forEach((item) => {
    atom += `
  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${item.link}"/>
    <id>${item.guid || item.link}</id>
    <updated>${formatDate(item.pubDate)}</updated>
    <summary><![CDATA[${item.description}]]></summary>`;

    if (item.content) {
      atom += `\n    <content type="html"><![CDATA[${item.content}]]></content>`;
    }

    if (item.author) {
      atom += `
    <author>
      <name>${escapeXml(item.author)}</name>
    </author>`;
    }

    if (item.categories) {
      item.categories.forEach((cat) => {
        atom += `\n    <category term="${escapeXml(cat)}"/>`;
      });
    }

    atom += `
  </entry>`;
  });

  atom += `
</feed>`;

  return atom;
}

// =============================================================================
// JSON Feed Generator (modern alternative)
// =============================================================================

export interface JsonFeed {
  version: string;
  title: string;
  home_page_url: string;
  feed_url: string;
  description?: string;
  icon?: string;
  favicon?: string;
  authors?: { name: string; url?: string; avatar?: string }[];
  language?: string;
  items: JsonFeedItem[];
}

export interface JsonFeedItem {
  id: string;
  url: string;
  title: string;
  content_html?: string;
  content_text?: string;
  summary?: string;
  image?: string;
  date_published?: string;
  date_modified?: string;
  authors?: { name: string; url?: string; avatar?: string }[];
  tags?: string[];
}

export function generateJsonFeed(config: FeedConfig, items: FeedItem[]): string {
  const feed: JsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: config.title,
    home_page_url: config.siteUrl,
    feed_url: config.feedUrl.replace(/\.xml$/, ".json"),
    description: config.description,
    language: config.language || "en",
    items: items.map((item) => ({
      id: item.guid || item.link,
      url: item.link,
      title: item.title,
      content_html: item.content,
      summary: item.description,
      date_published: item.pubDate.toISOString(),
      authors: item.author ? [{ name: item.author }] : undefined,
      tags: item.categories,
    })),
  };

  return JSON.stringify(feed, null, 2);
}

// =============================================================================
// Next.js API Route Helper
// =============================================================================
// Use in app/feed.xml/route.ts

export function createRSSResponse(rss: string): Response {
  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export function createAtomResponse(atom: string): Response {
  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export function createJsonFeedResponse(json: string): Response {
  return new Response(json, {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

// =============================================================================
// Feed Link Component (for <head>)
// =============================================================================

export interface FeedLinksProps {
  rss?: string;
  atom?: string;
  json?: string;
  title?: string;
}

export function getFeedLinkTags({
  rss,
  atom,
  json,
  title = "RSS Feed",
}: FeedLinksProps): React.ReactNode[] {
  const links: React.ReactNode[] = [];

  if (rss) {
    links.push(
      <link
        key="rss"
        rel="alternate"
        type="application/rss+xml"
        title={title}
        href={rss}
      />
    );
  }

  if (atom) {
    links.push(
      <link
        key="atom"
        rel="alternate"
        type="application/atom+xml"
        title={`${title} (Atom)`}
        href={atom}
      />
    );
  }

  if (json) {
    links.push(
      <link
        key="json"
        rel="alternate"
        type="application/feed+json"
        title={`${title} (JSON)`}
        href={json}
      />
    );
  }

  return links;
}
