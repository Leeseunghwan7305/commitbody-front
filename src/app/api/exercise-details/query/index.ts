import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteComment,
  getComment,
  getDetailsInfo,
  GetDetailsInfoPayload,
  postComment,
  postCommentLike,
  putComment,
} from '..';

export const useCommentList = (id: string, session: any, source: 'default' | 'custom') => {
  return useInfiniteQuery({
    queryKey: ['get_comment', id, session, source],
    queryFn: ({ pageParam = { lastId: null, size: 10 } }) =>
      getComment({
        session,
        id,
        source,
        lastId: pageParam.lastId,
        size: pageParam.size,
      }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: { lastId: null, size: 10 },
    getNextPageParam: (lastPage) => {
      const lastComment = lastPage?.data?.commentList?.[lastPage.data.commentList.length - 1];
      const nextLastId = lastComment ? lastComment.exerciseCommentId : null;
      return lastPage?.data?.hasNext ? { lastId: nextLastId, size: 10 } : undefined;
    },
    enabled: !!session,
  });
};

export const useDetailsInfo = ({ id, session, source }: GetDetailsInfoPayload) => {
  return useQuery({
    queryKey: ['get_detail_exercise_info'],
    queryFn: () => getDetailsInfo({ id, session, source }),
    enabled: !!session,
  });
};

export const useCommentPostLikeMutation = (
  id: string,
  session: any,
  type: 'custom' | 'default'
) => {
  const queryClient = useQueryClient();
  const postCommentLikeMutation = useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
  });

  return { postCommentLikeMutation };
};

export const useCommentPostMutation = (id: string, session: any, type: 'custom' | 'default') => {
  const queryClient = useQueryClient();
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      alert('댓글이 등록되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['get_comment'] });
    },
  });

  return { postCommentMutation };
};

export const useCommentPutMutation = (id: string, session: any, type: 'custom' | 'default') => {
  const queryClient = useQueryClient();
  const putCommentMutation = useMutation({
    mutationFn: putComment,
    onSuccess: () => {
      alert('댓글이 수정되었습니다.');
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
  });

  return { putCommentMutation };
};

export const useCommentDeleteMutation = (id: string, session: any, type: 'custom' | 'default') => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      queryClient.refetchQueries({ queryKey: ['get_comment', id, session, type] });
    },
  });

  return { deleteMutation };
};
