import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL!,
    response_type: 'code',
    scope: 'openid email profile',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
