import { useCookieJars } from '../hooks/useCookieJars';
import { useUpdateCookieJar } from '../hooks/useUpdateCookieJar';
import { cookieDomain } from '../lib/models';
import { Banner } from './core/Banner';
import { IconButton } from './core/IconButton';
import { InlineCode } from './core/InlineCode';

interface Props {
  cookieJarId: string | null;
}

export const CookieDialog = function ({ cookieJarId }: Props) {
  const updateCookieJar = useUpdateCookieJar(cookieJarId ?? null);
  const cookieJars = useCookieJars();
  const cookieJar = cookieJars.find((c) => c.id === cookieJarId);

  if (cookieJar == null) {
    return <div>No cookie jar selected</div>;
  }

  if (cookieJar.cookies.length === 0) {
    return (
      <Banner>
        Cookies will appear when a response contains the <InlineCode>Set-Cookie</InlineCode> header
      </Banner>
    );
  }

  return (
    <div className="pb-2">
      <table className="w-full text-xs mb-auto min-w-full max-w-full divide-y">
        <thead>
          <tr>
            <th className="py-2 text-left">Domain</th>
            <th className="py-2 text-left pl-4">Cookie</th>
            <th className="py-2 pl-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {cookieJar?.cookies.map((c) => (
            <tr key={c.domain + c.raw_cookie}>
              <td className="py-2 select-text cursor-text font-mono font-semibold max-w-0">
                {cookieDomain(c)}
              </td>
              <td className="py-2 pl-4 select-text cursor-text font-mono text-gray-700 whitespace-nowrap overflow-x-auto max-w-[200px] hide-scrollbars">
                {c.raw_cookie}
              </td>
              <td className="max-w-0 w-10">
                <IconButton
                  icon="trash"
                  size="xs"
                  iconSize="sm"
                  title="Delete"
                  className="ml-auto"
                  onClick={async () => {
                    console.log(
                      'DELETE COOKIE',
                      c,
                      cookieJar.cookies.filter((c2) => c2 !== c).length,
                    );
                    await updateCookieJar.mutateAsync({
                      ...cookieJar,
                      cookies: cookieJar.cookies.filter((c2) => c2 !== c),
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};