// Helpers
import getDeleteEntityFunction from "@/helpers/getDeleteEntityFunction";
// Hooks
import useNavigateToPathname from "./useNavigateToPathname";
// Redux
import { useAppDispatch } from "./redux";
// Types
import EntityType from "@/core/types/entity/users/EntityType";

const useGetHandleOnDeleteEntity = (
  entity: EntityType,
  entityId: string,
  userId: string
) => {
  const dispatch = useAppDispatch();
  const navigateToPathname = useNavigateToPathname();

  return () => {
    getDeleteEntityFunction(entity, dispatch, entityId, userId)?.();
    navigateToPathname({ forcedPathname: "/multi-view-tool" });
  };
};

export default useGetHandleOnDeleteEntity;
