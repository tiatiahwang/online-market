interface IProfileResponse {
  username: string;
  email: string;
  avatar_url: string;
}

export default async function getGoogleProfile(token: string): Promise<IProfileResponse> {
  const userProfileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  const googleProfile = await userProfileResponse.json();

  return {
    username: googleProfile.name,
    email: googleProfile.email,
    avatar_url: googleProfile.picture,
  };
}
