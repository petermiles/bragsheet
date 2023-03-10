import { ssrFetchWithAuth } from "@/utils/api";
import { Container, List, Text, Title } from "@mantine/core";
import { Brag } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CreateIndividualBrag from "./components/CreateBrag";

type RequestData = {
  sheet: {
    brags: Brag[];
    title: string;
  };
};

export const getServerSideProps: GetServerSideProps<RequestData> = async (
  ctx
) => {
  const { params } = ctx;
  const sheetId = params?.id as string;

  const sheet = await ssrFetchWithAuth(ctx, {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sheet/get/${sheetId}`,
    method: "GET",
  });

  if (!sheet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      sheet,
    },
  };
};

const BragSheetPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { sheet } = props;

  return (
    <Container size="sm" title="Tester">
      <Title>{sheet.title}</Title>
      <List>
        {sheet.brags.map((brag) => (
          <List.Item key={brag.id}>
            <Text variant="text">{brag.content}</Text>
          </List.Item>
        ))}
      </List>

      <CreateIndividualBrag />
    </Container>
  );
};

export default BragSheetPage;
