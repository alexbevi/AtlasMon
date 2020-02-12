//billingnobucket
[{
  $sort: {
      lastQueryTime: -1
  }
}, {
  $limit: 1
}, {
  $project: {
      ymd: 1,
      t: {
          $dateFromParts: {
              year: "$ymd.year",
              month: "$ymd.mo",
              day: "$ymd.d"
          }
      },
      m: {
          $arrayElemAt: ["$measurements", -1]
      }
  }
}]