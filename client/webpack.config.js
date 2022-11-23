const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static', /* 분석 파일 html 보고서를 dist 폴더에 저장한다 */
        reportFilename: 'bundle-report.html', /* 분석 파일 보고서 이름은 아무거나 정하면 된다. */
        openAnalyzer: true, /* 분석창을 실행시 열지 않는다 */
        generateStatsFile: true, /* 분석 파일을 json 저장한다 . */
        statsFilename: 'bundle-stats.json', /* 분석 파일 json 이름은 아무거나 정하면 된다. */
      }),
  ]
}