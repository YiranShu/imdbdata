library(tidyverse)
library(patchwork)


subN <- function(df) {
  for (n in names(df)){
    if (class(df[[n]])=='character'){
      df[[n]] <- gsub("\\N", NA, df[[n]], fix=TRUE)
    }
  }
  return(df)
}