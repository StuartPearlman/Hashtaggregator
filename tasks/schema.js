//schema for tweet objects

module.exports = {
  name: "tweets",
  columns: [
    {
      name: 'id',
      dataType: 'serial'
    },
    {
      name: 'username',
      dataType: 'character varying(255)'
    },
    {
      name: 'content',
      dataType: 'character varying(255)'
    },
    {
      name: 'longitude',
      dataType: 'decimal'
    },
    {
      name: 'latitude',
      dataType: 'decimal'
    },
    {
      name: 'twitter_id',
      dataType: 'character varying(255)'
    },
    {
      name: 'location',
      dataType: 'character varying(255)'
    },
    {
      name: 'stars',
      dataType: 'integer'
    }//,
    // {
    //   name: 'updated_at',
    //   dataType: 'time',
    // },
    // {
    //   name: 'created_at',
    //   dataType: 'time'
    // }
  ]
}
