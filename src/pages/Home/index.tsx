import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "@apollo/client";
import moment, { Moment } from "moment";
import { Post } from "../../@types/post";
import { Input } from "antd";
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
  Content,
  SearchWrapper,
} from "./styles";
import { TabEnum } from "../../@types/tab";
import Tabs from "../../components/Tabs";
import DatePicker from "../../components/DatePicker";
import Loading from "react-loading";
import { theme } from "../../theme";
import useLocalStorage from "../../hooks/useLocalStorage";

function parsePostsData(data: Post[], favoriteValue: Post[]) {
  return data?.map((obj) => {
    if (favoriteValue?.some((item) => item.id === obj.id)) {
      return { ...obj, fav: true };
    } else {
      return { ...obj, fav: false };
    }
  });
}

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const [data, setData] = useState<Post[]>();
  const [filteredData, setFilteredData] = useState<Post[] | null>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabEnum>("popular");
  const [pageInfo, setPageInfo] = useState<
    ResponseType<Post, "posts">["posts"]["pageInfo"]
  >();
  const [loadMore, setLoadMore] = useState(false);
  const [favoriteValue, setFavoriteValue] = useLocalStorage("favorites", []);

  const { loading, data: responseData, error, fetchMore } = useQuery<
    ResponseType<Post, "posts">
  >(GET_POSTS, {
    variables: {
      featured: activeTab === "newest" ? false : true,
      order: activeTab === "newest" ? "NEWEST" : "VOTES",
      postedAfter: selectedDate?.startOf("day").toISOString(),
      postedBefore: selectedDate?.endOf("day").toISOString(),
      first: 15,
      after: "",
    },
  });

  useEffect(() => {
    const formatted = responseData?.posts.edges.map((obj) => obj.node);
    setData(parsePostsData(formatted!, favoriteValue));
    setPageInfo(responseData?.posts.pageInfo!);
  }, [favoriteValue, responseData]);

  useEffect(() => {
    (async () => {
      if (loadMore) {
        if (pageInfo?.hasNextPage) {
          const { data: moreData } = await fetchMore({
            variables: {
              first: 15,
              after: pageInfo!.endCursor,
            },
          });
          setPageInfo(moreData?.posts.pageInfo!);
          const moreFormatted = moreData?.posts.edges.map((obj) => obj.node);
          setData((prev) => [
            ...prev!,
            ...parsePostsData(moreFormatted!, favoriteValue),
          ]);
        }
      }
    })();
    setLoadMore(false);
  }, [favoriteValue, fetchMore, loadMore, pageInfo]);

  const favItem = (item: Post, status: boolean) => {
    const itens = data?.map((obj) => {
      if (obj.id === item.id) {
        return { ...obj, fav: status };
      }
      return obj;
    });
    setData([...itens!]);
  };

  const storageData = (product: Post) => {
    let storagedData = favoriteValue as Post[];
    if (product.fav) {
      favItem(product, false);
      setFavoriteValue(storagedData.filter((obj) => obj.id !== product.id));
    } else {
      let arr: Post[] = [];
      if (!storagedData) {
        arr.push({ ...product, fav: true });
      } else {
        if (!storagedData.some((obj) => obj.id === product.id))
          storagedData.push({ ...product, fav: true });
      }
      setFavoriteValue(storagedData || arr);
      favItem(product, true);
    }
  };

  const handleScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (
        e.currentTarget.scrollTop + e.currentTarget.clientHeight >=
        e.currentTarget.scrollHeight - 2
      ) {
        if (activeTab !== "favorites") setLoadMore(true);
      }
    },
    [activeTab]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        setFilteredData(null);
      } else {
        setFilteredData([
          ...(data as Post[]).filter((obj) =>
            obj.name.toLowerCase().startsWith(value.toLowerCase())
          )!,
        ]);
      }
    },
    [data]
  );

  const isEmpty = () => {
    if(activeTab === "favorites" && favoriteValue.length === 0) return true;
    return (
      data?.length === 0 ||
      error
    );
  };
  return (
    <Container>
      <Header>
        <Menu>
          <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQHhVRUrg0-HOA/profile-displayphoto-shrink_200_200/0/1616630141036?e=1622678400&v=beta&t=dq4epFH4tJLs-cnd4zUUOO2CHp7Xq5NsrwalWyhAV7k" />
          <DatePicker
            selectedDate={selectedDate!}
            focused={focused}
            onDateChange={(date) => setSelectedDate(date)}
            onFocusChange={({ focused }) => setFocused(focused)}
          />
          <SearchWrapper>
            <FiSearch size={20} />
            <Input onChange={handleInputChange} placeholder="Buscar..." />
          </SearchWrapper>
        </Menu>
        <Tabs
          active={activeTab}
          handleTabClick={(value) => setActiveTab(value)}
          tabs={[
            { label: "Popular", value: "popular" },
            { label: "Newest", value: "newest" },
            { label: "Favorites", value: "favorites" },
          ]}
        />
      </Header>
      <Content onScroll={handleScroll}>
        {loading ? (
          <LoadingWrapper>
            <Loading type="spinningBubbles" color={theme.colors.primary} />
          </LoadingWrapper>
        ) : isEmpty() ? (
          <Empty>
            <EmptyIcon size={50} />
            <Warn>
              {activeTab !== "favorites"
                ? "Sorry, wasn't found any product."
                : "Any product was added to favorite."}
            </Warn>
          </Empty>
        ) : (
          <PostsList
            posts={
              activeTab === "favorites"
                ? favoriteValue || []
                : filteredData || data!
            }
            storageData={storageData}
          />
        )}
      </Content>
    </Container>
  );
};

export default Home;
