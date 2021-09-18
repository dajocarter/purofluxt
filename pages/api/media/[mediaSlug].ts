import type { NextApiRequest, NextApiResponse } from 'next'
import type { WP_REST_API_Attachment } from 'wp-types'
import { getWPMedia } from '../../../lib/wordpress'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WP_REST_API_Attachment>
) {
  const { status, data } = await getWPMedia(req.query.mediaSlug as string)
  res.status(status).json(data)
}
