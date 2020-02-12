// graph of day by day usage
// billingnobucket
[{
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