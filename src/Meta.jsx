import { Helmet } from "react-helmet-async";

function Meta({
  title = "MYOB Quick Start",
  description = "Learn MYOB accounting with step-by-step guides and practical examples.",
  icon = "/favicon/favicon.ico",
}) {
  const siteName = "MYOB Quick Start";
  const url = window.location.href;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Favicon */}
      <link rel="icon" href={icon} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="/logo.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/logo.png" />
    </Helmet>
  );
}

export default Meta;
