import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors } from 'middy/middlewares'
import * as middy from 'middy'
import { getPhtosForUser } from '../../businessLogic/photo'
import { getUserId } from '../utils'

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const userId = getUserId(event)
    const photos = await getPhtosForUser(userId)
    return {
      statusCode: 200,
      body: JSON.stringify(photos)
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
