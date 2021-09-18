export async function getWPMedia (mediaSlug: string) {
  const mediaResponse = await fetch(`${process.env.WP_API_URL}/wp/v2/media?slug=${mediaSlug}`)
  const mediaData = await mediaResponse.json()
  return { status: mediaResponse.status, data: mediaData?.[0] }
}