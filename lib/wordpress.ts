import type { WP_REST_API_Attachment, WP_REST_API_Post } from 'wp-types'

export async function getWPMedia (mediaSlug: string): Promise<{ status: number; data: WP_REST_API_Attachment}> {
  const mediaResponse = await fetch(`${process.env.WP_API_URL}/wp/v2/media?slug=${mediaSlug}`)
  const mediaData = await mediaResponse.json()
  return { status: mediaResponse.status, data: mediaData?.[0] }
}

export type WP_REST_API_Menu = {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  items: WP_REST_API_Post[];
}
export async function getWPMenu (menuSlug: string): Promise<{ status: number; data: WP_REST_API_Menu; }> {
  const menuResponse = await fetch(`${process.env.WP_API_URL}/menus/v1/menus/${menuSlug}`)
  const menuData = await menuResponse.json()
  return { status: menuResponse.status, data: menuData }
}