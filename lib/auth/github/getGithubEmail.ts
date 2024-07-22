interface IGithubEmail {
  email: string;
  primary: boolean;
}

export default async function getGithubEmail(token: string): Promise<string> {
  const userEmailResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  });

  const { email } = (await userEmailResponse.json()).find((element: IGithubEmail) => element.primary);

  return email;
}
