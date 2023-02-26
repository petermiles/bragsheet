import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import PageHeader from "@/components/PageHeader";
import { Container } from "@mantine/core";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: "/sheets",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default function SignIn() {
  const supabase = useSupabaseClient();

  return (
    <>
      <PageHeader />
      <Container size="sm">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          redirectTo="/sheets"
          magicLink
        />
      </Container>
    </>
  );
}
