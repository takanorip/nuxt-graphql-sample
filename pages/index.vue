<template>
  <div class="content">
    <b-input type="number" v-model.number="number"></b-input>
    <div v-if="$apollo.loading">Loading...</div>
    <ul v-if="!$apollo.loading">
      <li v-for="repo in repos" :key="repo.name" class="columns">
        <a class="is-one-quarter column" :href="repo.url">{{ repo.name }}</a>
        <div class="column is-narrow" v-if="!repo.viewerHasStarred">
          <button
            class="button"
            type="button"
            @click="addStar(repo.id)"
          >
            add star
          </button>
        </div>
        <div class="column is-narrow" v-if="repo.viewerHasStarred">
          <button
            class="button is-danger"
            type="button"
            @click="removeStar(repo.id)"
          >
            remove star
          </button>
        </div>
        <span class="column is-one-fifth" v-if="repo.viewerHasStarred">Starred</span>
      </li>
    </ul>
  </div>
</template>

<script>
import getReposGql from '../apollo/gql/getRepos.gql'
import addStarGql from '../apollo/gql/addStar.gql'
import removeStarGql from '../apollo/gql/removeStarGql.gql'

export default {
  data() {
    return {
      repos: [],
      number: 3
    }
  },
  apollo: {
    repos: {
      query: getReposGql,
      variables() {
        return {
          number_of_repos: this.number
        }
      },
      update: data => {
        console.log(data)
        return data.viewer.repositories.nodes
      }
    }
  },
  methods: {
    addStar (addStarId) {
      this.$apollo.mutate({
        mutation: addStarGql,
        variables: {
          id: addStarId
        }
      })
    },
    removeStar (removeStarId) {
      this.$apollo.mutate({
        mutation: removeStarGql,
        variables: {
          id: removeStarId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content {
    padding: 32px 16px;
  }
  .columns {
    align-items: center;
  }
  ul {
    margin: 0;
    margin-top: 32px;
  }
</style>
