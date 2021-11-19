library(tidyverse)
library(patchwork)


visna <- function(df, percent=FALSE) {
  missing_patterns <- data.frame(is.na(df)) %>%
    group_by_all() %>%
    count(name = "count", sort = TRUE) %>%
    ungroup()
  missing_patterns$order <- 1:nrow(missing_patterns)
  missing_patterns <- missing_patterns %>% mutate_all(as.integer)
  
  complete_row <- 0
  for (i in 1:nrow(missing_patterns))
  {
    if (sum(missing_patterns[i,1:(ncol(missing_patterns)-2)])==0) complete_row <- i
  }
  
  patterns_tidy <- missing_patterns %>%
    gather(key= "varname", value="ifmissing", 1:(ncol(missing_patterns)-2))
  
  var_freq <- patterns_tidy %>%
    group_by(varname) %>%
    summarise(f=sum(count*ifmissing)) %>%
    ungroup() %>%
    arrange(desc(f))
  
  pattern_freq <- missing_patterns[,(ncol(missing_patterns)-1):ncol(missing_patterns)]
  pattern_freq$fil <- 1
  if (complete_row != 0) pattern_freq$fil[complete_row] <- 2
  var_levels <- var_freq$varname
  patterns_tidy$order = fct_rev(factor(patterns_tidy$order))
  patterns_tidy[patterns_tidy$order==complete_row, "ifmissing"] = 2
  
  main <- ggplot(patterns_tidy, aes(x=factor(varname, levels=var_levels), y=order)) +
    geom_tile(aes(fill=factor(ifmissing)), color="white") +
    scale_fill_manual(breaks=c(0,1,2),values=c("#C0C0C0", "#E69F00", "#909090")) +
    theme_classic() +
    ylab("missing pattern") +
    xlab("variable") +
    theme(legend.position = "none")
  
  if (percent==TRUE){
    if (sum(var_freq$f)>0) var_freq$f <- var_freq$f / sum(var_freq$f) *100
    pattern_freq$count <- pattern_freq$count / sum(pattern_freq$count)*100
  }
  
  up <- ggplot(var_freq, aes(x=factor(varname, levels=var_levels), y=f)) +
    geom_bar(stat="identity", fill="#027FDE", alpha=0.7) +
    xlab("") +
    ggtitle("Missing value patterns") +
    theme(panel.border = element_rect(fill=NA, size=0.6),
          panel.background = element_blank(),
          panel.grid.major.y = element_line(color="#E0E0E0", size=0.3),
          panel.grid.minor.y = element_line(color="#E0E0E0", size=0.3),
          panel.grid.minor.x = element_blank(),
          panel.grid.major.x = element_blank())
  
  
  right <- ggplot(pattern_freq, aes(x=fct_rev(factor(order)), y=count)) +
    geom_bar(aes(fill=factor(fil)), stat="identity", alpha=0.7) +
    scale_fill_manual(breaks=c(1,2),values=c("#027FDE", "#004F8B")) +
    coord_flip() +
    xlab("") +
    theme(panel.border = element_rect(fill=NA, size=0.6),
          panel.background = element_blank(),
          panel.grid.major.x = element_line(color="#E0E0E0", size=0.3),
          panel.grid.minor.x = element_line(color="#E0E0E0", size=0.3),
          panel.grid.minor.y = element_blank(),
          panel.grid.major.y = element_blank(),
          legend.position = "none")
  
  if (percent==TRUE){
    up <- up + 
      ylab("% rows \n missing") +
      scale_y_continuous(expand = c(0, 0),limits=c(0,100))
    right <- right + 
      ylab("% rows") +
      scale_y_continuous(expand = c(0, 0),limits=c(0,100))
  } else {
    up <- up + 
      ylab("num rows \n missing") +
      scale_y_continuous(expand = c(0, 0),breaks=function(x) pretty(x, n=4)) 
    right <- right + 
      ylab("row count") +
      scale_y_continuous(expand = c(0, 0),breaks=function(x) pretty(x, n=4)) 
  }
  
  result <- up +  plot_spacer() + main + right + plot_layout(nrow=2,ncol=2, widths=c(4,1),heights=c(2,6))
  return(result)
}