import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "@apollo/client";
import moment, { Moment } from "moment";
import { Post } from "../../@types/post";
import { ResponseType } from "../../@types/queryResponse";
import PostsList from "../../components/PostsList";
import { GET_POSTS } from "../../gql/post";
import {
  Avatar,
  Container,
  Empty,
  Header,
  LoadingWrapper,
  Menu,
  Warn,
  EmptyIcon,
} from "./styles";
import { TabEnum } from "../../@types/tab";
import Tabs from "../../components/Tabs";
import DatePicker from "../../components/DatePicker";
import Loading from "react-loading";
import { theme } from "../../theme";

const Home: React.FC  = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const [data, setData] = useState<Post[]>();
  const [focused, setFocused] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabEnum>("popular");
  const [pageInfo, setPageInfo] = useState<
    ResponseType<Post, "posts">["posts"]["pageInfo"]
  >();
  const [loadMore, setLoadMore] = useState(false);

  const { loading, data: responseData, error, fetchMore } = useQuery<
    ResponseType<Post, "posts">
  >(GET_POSTS, {
    variables: {
      featured: activeTab === "newest" ? false : true,
      order: activeTab === "newest" ? "NEWEST" : "VOTES",
      postedAfter: selectedDate?.startOf("day").toISOString(),
      postedBefore: selectedDate?.endOf("day").toISOString(),
      first: 10,
      after: "",
    },
  });

  useEffect(() => {
    const formatted = responseData?.posts.edges.map((obj) => obj.node);
    setData(formatted);
    setPageInfo(responseData?.posts.pageInfo!);
  }, [responseData]);

  useEffect(() => {
    (async () => {
      if (loadMore) {
        if (pageInfo?.hasNextPage) {
          const { data: moreData } = await fetchMore({
            variables: {
              first: 10,
              after: pageInfo!.endCursor,
            },
          });
          setPageInfo(moreData?.posts.pageInfo!);
          const moreFormatted = moreData?.posts.edges.map((obj) => obj.node);
          setData((prev) => [...prev!, ...moreFormatted]);
        }
      }
    })();
    setLoadMore(false);
  }, [fetchMore, loadMore, pageInfo]);

  const handleScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (
        e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
        e.currentTarget.scrollHeight - 2
      ) {
        setLoadMore(true);
      }
    },
    []
  );

  return (
    <Container>
      <Header>
        <Menu>
          <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQFloAzIvD1TEw/profile-displayphoto-shrink_200_200/0/1516931640083?e=1618444800&v=beta&t=lo8uL5U9-XDw3AMzfl2h_mQHiKRIyFBh4BsyQtt8tvU" />
          <DatePicker
            selectedDate={selectedDate!}
            focused={focused}
            onDateChange={(date) => setSelectedDate(date)}
            onFocusChange={({ focused }) => setFocused(focused)}
          />
          <FiSearch />
        </Menu>
        <Tabs
          active={activeTab}
          handleTabClick={(value) => setActiveTab(value)}
          tabs={[
            { label: "Popular", value: "popular" },
            { label: "Newest", value: "newest" },
          ]}
        />
      </Header>
      {loading ? (
        <LoadingWrapper>
          <Loading type="spinningBubbles" color={theme.colors.primary} />
        </LoadingWrapper>
      ) : (data?.length === 0 || error) ? (
        <Empty>
          <EmptyIcon size={50} />
          <Warn>Sorry, wasn't found any post this day.</Warn>
        </Empty>
      ) : (
        <PostsList posts={data!} onScroll={handleScroll} />
      )}
    </Container>
  );
}

export default Home;
