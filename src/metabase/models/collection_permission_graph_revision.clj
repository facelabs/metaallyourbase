(ns metabase.models.collection-permission-graph-revision
  (:require
   [metabase.util :as u]
   [metabase.util.i18n :refer [tru]]
   [toucan.db :as db]
   [toucan.models :as models]))

(models/defmodel CollectionPermissionGraphRevision :collection_permission_graph_revision)

(u/strict-extend #_{:clj-kondo/ignore [:metabase/disallow-class-or-type-on-model]} (class CollectionPermissionGraphRevision)
  models/IModel
  (merge models/IModelDefaults
         {:types      (constantly {:before :json
                                   :after  :json})
          :properties (constantly {:created-at-timestamped? true})
          :pre-update (fn [& _] (throw (Exception. (tru "You cannot update a CollectionPermissionGraphRevision!"))))}))

(defn latest-id
  "Return the ID of the newest `CollectionPermissionGraphRevision`, or zero if none have been made yet.
   (This is used by the collection graph update logic that checks for changes since the original graph was fetched)."
  []
  (or (:id (db/select-one [CollectionPermissionGraphRevision [:%max.id :id]]))
      0))
