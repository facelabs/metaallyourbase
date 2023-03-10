(ns metabase.models.native-query-snippet.permissions
  "NativeQuerySnippets have different permissions implementations. In Metabase CE, anyone can read/edit/create all
  NativeQuerySnippets. EE has a more advanced implementation."
  (:require
   [metabase.public-settings.premium-features :refer [defenterprise]]))

(defenterprise can-read?
  "Can the current User read this `snippet`?"
  ([_] true)
  ([_ _] true))

(defenterprise can-write?
  "Can the current User edit this `snippet`?"
  ([_] true)
  ([_ _] true))

(defenterprise can-create?
  "Can the current User save a new Snippet with the values in `m`?"
  [_ _] true)

(defenterprise can-update?
  "Can the current User apply a map of `changes` to a `snippet`?"
  [_ _]
  true)
