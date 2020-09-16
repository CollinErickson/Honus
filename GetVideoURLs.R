library(jsonlite)
library(dplyr)
j1 <- fromJSON('https://gd2.mlb.com/components/game/mlb/year_2020/month_09/day_13/gid_2020_09_13_oakmlb_texmlb_1/game_events.json')
j1 <- fromJSON('https://gd2.mlb.com/components/game/mlb/year_2020/month_09/day_12/gid_2020_09_12_oakmlb_texmlb_1/game_events.json')
class(j1)
length(j1)
names(j1)
# j1$data %>% str
j1[[1]]
names(j1$data)
j1$data %>% length
j1$data$game %>% length
j1$data$game$atBat
j1$data$game$deck
j1$data$game$hole
j1$data$game$inning %>% length
j1$data$game$inning$top %>% length
j1$data$game$inning$top[[1]]
j1$data$game$inning$top[[2]]
j1$data$game$inning$top[[2]][[1]] %>% str


j2 <- fromJSON('https://gd2.mlb.com/components/game/mlb/year_2020/month_09/day_12/gid_2020_09_12_oakmlb_texmlb_1/game_events.json', simplifyVector = F)
length(j2)
j2$data$game$inning %>% length
j2$data$game$inning %>% names
j2$data$game$inning[[1]]$top$action
j2$data$game$inning[[1]]$top$atbat

urldf <- NULL
for (inni in 1:length(j2$data$game$inning)) {
  for (topbottom in c("top", "bottom")) {
    cat("itb", inni, topbottom, '\n')
    for (iii in 1:length(j2$data$game$inning[[inni]][[topbottom]]$atbat)) {
      cat('\t', '\n')
      j2$data$game$inning[[inni]][[topbottom]]$atbat[[iii]]
      urldf <- rbind(urldf,
                         tibble(play_guid=j2$data$game$inning[[inni]][[topbottom]]$atbat[[iii]]$play_guid))
    }
  }
}
urldf

library(rvest)
urldf$vidurl <- NA
for (irow in 1:nrow(urldf)) {
  urli <- paste0("https://baseballsavant.mlb.com/sporty-videos?playId=", urldf$play_guid[[irow]])
  cat(irow, urli, '\n')
  h1 <- read_html(urli)
  # h1 %>% html_nodes("video.video") %>% html_attrs() %>% .[[1]] %>% 
  vidurl <- h1 %>% html_nodes("video.video") %>% html_children() %>% .[[1]] %>% html_attrs() %>% .[['src']]
  urldf$vidurl[[irow]] <- vidurl
}
urldf
vidurls <- urldf$vidurl
names(vidurls) <- urldf$play_guid
vidurls
toJSON(vidurls)
toJSON(data.frame(t(vidurls)))
vidurlsdf <- as.data.frame(matrix(urldf$vidurl, nrow=1))
colnames(vidurlsdf) <- urldf$play_guid
vidurlsdf
toJSON(vidurlsdf)
vidurlsjson <- toJSON(vidurlsdf)
write_json(x=vidurlsjson, path = paste0("./URLsJSON/test1.json"))
