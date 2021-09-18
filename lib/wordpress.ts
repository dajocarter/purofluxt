export async function getWPMedia (mediaSlug: string) {
  const mediaResponse = await fetch(`${process.env.WP_API_URL}/wp/v2/media?slug=${mediaSlug}`).then(res => res.json())
  return mediaResponse?.[0]
}