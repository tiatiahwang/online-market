interface IProfileResponse {
  id: number;
  username: string;
  avatar_url: string;
}

export default async function getGithubProfile(token: string): Promise<IProfileResponse> {
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  const githubProfile = await userProfileResponse.json();

  return {
    id: +githubProfile.id,
    username: githubProfile.login,
    avatar_url: githubProfile.avatar_url,
  };
}
