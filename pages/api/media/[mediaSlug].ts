import type { NextApiRequest, NextApiResponse } from 'next'
import { getWPMedia } from '../../../lib/wordpress'

type WPMedia = {
  id: number;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    file: string;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WPMedia>
) {
  const { status, data } = await getWPMedia(req.query.mediaSlug as string)
  res.status(status).json(data)
}
