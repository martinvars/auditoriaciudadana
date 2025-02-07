-- Add XSS protection constraints to proposals
ALTER TABLE proposals ADD CONSTRAINT prevent_xss_proposals
CHECK (
  description !~ '<[^>]*script.*?>.*?</script>' AND
  title !~ '<[^>]*script.*?>.*?</script>' AND
  description !~ 'javascript:' AND
  title !~ 'javascript:' AND
  description !~ 'data:text/html' AND
  title !~ 'data:text/html' AND
  description !~ 'vbscript:' AND
  title !~ 'vbscript:' AND
  description !~ 'onload=' AND
  title !~ 'onload=' AND
  description !~ 'onerror=' AND
  title !~ 'onerror='
);

-- Add XSS protection constraints to comments
ALTER TABLE comments ADD CONSTRAINT prevent_xss_comments
CHECK (
  content !~ '<[^>]*script.*?>.*?</script>' AND
  content !~ 'javascript:' AND
  content !~ 'data:text/html' AND
  content !~ 'vbscript:' AND
  content !~ 'onload=' AND
  content !~ 'onerror='
);

-- Add XSS protection to nicknames
ALTER TABLE proposals ADD CONSTRAINT prevent_xss_proposals_nickname
CHECK (
  nickname !~ '<[^>]*script.*?>.*?</script>' AND
  nickname !~ 'javascript:' AND
  nickname !~ 'data:text/html' AND
  nickname !~ 'vbscript:' AND
  nickname !~ 'onload=' AND
  nickname !~ 'onerror='
);

ALTER TABLE comments ADD CONSTRAINT prevent_xss_comments_nickname
CHECK (
  nickname !~ '<[^>]*script.*?>.*?</script>' AND
  nickname !~ 'javascript:' AND
  nickname !~ 'data:text/html' AND
  nickname !~ 'vbscript:' AND
  nickname !~ 'onload=' AND
  nickname !~ 'onerror='
);