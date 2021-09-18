import type { NextApiRequest, NextApiResponse } from 'next'
import { getWPMenu, WP_REST_API_Menu } from '../../../lib/wordpress'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WP_REST_API_Menu>
) {
  const { status, data } = await getWPMenu(req.query.menuSlug as string)
  res.status(status).json(data)
}
