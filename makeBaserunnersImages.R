bases = c(F,F,F)
id=0
saveit=T
if (saveit)
  png(file=paste0("Baserunners",id,".png"), bg="transparent")
par(mar=c(0,0,0,0), xaxs="i", yaxs="i")
plot(NULL, xlim=0:1,ylim=c(.25,1),frame=F, axes=F)
# get data
dx = c(0,.25,.5,.25)
dy = c(0,-.25,0,.25)
x1 <- .5 + dx
x2 <- .25 + dx
x3 <- dx
y1 <- .5 + dy
y2 <- .75 + dy
y3 <- .5 + dy

# first
polygon(x1,y1, col=1)
# second
polygon(x2,y2, col=1)
# third
polygon(x3,y3, col=1)

d <- .1
ddx <- c(d, 0, -d, 0)
ddy <- c(0, d, 0, -d)


if (!bases[1]) {polygon(x1 + ddx,y1 + ddy, col='white')}
if (!bases[2]) {polygon(x2 + ddx,y2 + ddy, col='white')}
if (!bases[3]) {polygon(x3 + ddx,y3 + ddy, col='white')}

if (saveit)
  dev.off()

