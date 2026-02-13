"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  KeyboardEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// ChatContainer — Full chat interface with auto-scroll
// =============================================================================

interface ChatContainerProps {
  children: ReactNode;
  className?: string;
  /** Auto-scroll to bottom on new messages */
  autoScroll?: boolean;
  /** Max height before scrolling */
  maxHeight?: string;
  /** Background style */
  variant?: "default" | "glass" | "dark";
}

export function ChatContainer({
  children,
  className,
  autoScroll = true,
  maxHeight = "600px",
  variant = "default",
}: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll || !bottomRef.current) return;

    const observer = new MutationObserver(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    if (scrollRef.current) {
      observer.observe(scrollRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [autoScroll]);

  const variantClasses = {
    default: "bg-zinc-950 border border-zinc-800",
    glass:
      "bg-zinc-950/60 backdrop-blur-xl border border-white/10",
    dark: "bg-black border border-zinc-900",
  };

  return (
    <div
      className={cn(
        "chat-container rounded-2xl overflow-hidden flex flex-col",
        variantClasses[variant],
        className
      )}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-700"
        style={{ maxHeight }}
      >
        {children}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// =============================================================================
// ChatBubble — Animated message bubble with spring pop-in
// =============================================================================

interface ChatBubbleProps {
  children: ReactNode;
  className?: string;
  variant?: "user" | "assistant" | "system";
  /** Avatar element */
  avatar?: ReactNode;
  /** Timestamp string */
  timestamp?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Disable animation */
  animate?: boolean;
}

export function ChatBubble({
  children,
  className,
  variant = "assistant",
  avatar,
  timestamp,
  delay = 0,
  animate = true,
}: ChatBubbleProps) {
  const isUser = variant === "user";
  const isSystem = variant === "system";

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: isUser ? 20 : -20,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
        delay,
      },
    },
  };

  const variantClasses = {
    user: "bg-violet-600 text-white ml-auto rounded-2xl rounded-br-md",
    assistant:
      "bg-zinc-800 text-zinc-100 mr-auto rounded-2xl rounded-bl-md",
    system:
      "bg-zinc-900/50 text-zinc-400 mx-auto rounded-xl text-sm italic border border-zinc-800/50",
  };

  const Wrapper = animate ? motion.div : "div";
  const wrapperProps = animate
    ? { variants: bubbleVariants, initial: "hidden", animate: "visible" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "flex gap-3 max-w-[85%]",
        isUser ? "flex-row-reverse ml-auto" : "mr-auto",
        isSystem && "max-w-full justify-center"
      )}
    >
      {avatar && !isSystem && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center text-xs">
          {avatar}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            "px-4 py-2.5 max-w-prose",
            variantClasses[variant],
            className
          )}
        >
          {children}
        </div>
        {timestamp && (
          <span
            className={cn(
              "text-[10px] text-zinc-500 px-1",
              isUser ? "text-right" : "text-left"
            )}
          >
            {timestamp}
          </span>
        )}
      </div>
    </Wrapper>
  );
}

// =============================================================================
// TypingIndicator — Three bouncing dots
// =============================================================================

interface TypingIndicatorProps {
  className?: string;
  visible?: boolean;
  /** Who is typing */
  label?: string;
}

export function TypingIndicator({
  className,
  visible = true,
  label,
}: TypingIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: 10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn("flex items-center gap-2", className)}
        >
          {label && (
            <span className="text-xs text-zinc-500">{label}</span>
          )}
          <div className="flex gap-1 bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-zinc-400 rounded-full"
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// StreamingText — AI-style word-by-word streaming with animations
// =============================================================================

type StreamAnimation = "fade" | "blur" | "slide" | "typewriter" | "none";

interface StreamingTextProps {
  /** The full text to stream */
  text: string;
  className?: string;
  /** Animation style for each word */
  animation?: StreamAnimation;
  /** Words per second */
  speed?: number;
  /** Granularity */
  mode?: "word" | "character";
  /** Callback when streaming completes */
  onComplete?: () => void;
  /** Start streaming immediately */
  autoStart?: boolean;
  /** Show cursor while streaming */
  showCursor?: boolean;
}

export function StreamingText({
  text,
  className,
  animation = "fade",
  speed = 30,
  mode = "word",
  onComplete,
  autoStart = true,
  showCursor = true,
}: StreamingTextProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const tokens =
    mode === "word"
      ? text.split(/(\s+)/).filter(Boolean)
      : text.split("");

  useEffect(() => {
    if (!autoStart) return;

    setVisibleCount(0);
    setIsComplete(false);

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= tokens.length) {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [text, speed, autoStart, tokens.length, onComplete]);

  const getTokenAnimation = (index: number) => {
    if (index >= visibleCount) return { opacity: 0 };

    const isNew = index === visibleCount - 1;
    if (!isNew) return { opacity: 1 };

    switch (animation) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.15 },
        };
      case "blur":
        return {
          initial: { opacity: 0, filter: "blur(4px)" },
          animate: { opacity: 1, filter: "blur(0px)" },
          transition: { duration: 0.2 },
        };
      case "slide":
        return {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.15, ease: "easeOut" },
        };
      case "typewriter":
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
        };
      default:
        return { opacity: 1 };
    }
  };

  return (
    <span className={cn("streaming-text", className)}>
      {tokens.map((token, i) => {
        if (i >= visibleCount) return null;

        const animProps = getTokenAnimation(i);

        if (animation === "none" || animation === "typewriter") {
          return (
            <span key={i} className="inline">
              {token}
            </span>
          );
        }

        return (
          <motion.span
            key={i}
            className="inline"
            {...animProps}
          >
            {token}
          </motion.span>
        );
      })}
      {showCursor && !isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1.1em] bg-current ml-0.5 align-text-bottom"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
        />
      )}
    </span>
  );
}

// =============================================================================
// ChatInput — Animated expandable input with send button
// =============================================================================

interface ChatInputProps {
  className?: string;
  placeholder?: string;
  onSend?: (message: string) => void;
  disabled?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  variant?: "default" | "glass" | "minimal";
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  function ChatInput(
    {
      className,
      placeholder = "Type a message...",
      onSend,
      disabled = false,
      maxLength,
      showCharCount = false,
      variant = "default",
    },
    forwardedRef
  ) {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    useImperativeHandle(forwardedRef, () => internalRef.current!);

    const handleSend = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSend?.(trimmed);
      setValue("");
      // Reset height
      if (internalRef.current) {
        internalRef.current.style.height = "auto";
      }
    }, [value, disabled, onSend]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleInput = () => {
      const el = internalRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
    };

    const variantClasses = {
      default:
        "bg-zinc-900 border border-zinc-700 focus-within:border-violet-500",
      glass:
        "bg-white/5 backdrop-blur-md border border-white/10 focus-within:border-violet-400/50",
      minimal:
        "bg-transparent border-b border-zinc-700 rounded-none focus-within:border-violet-500",
    };

    return (
      <motion.div
        className={cn(
          "chat-input flex items-end gap-2 rounded-xl p-2 transition-colors duration-200",
          variantClasses[variant],
          className
        )}
        animate={{
          boxShadow: isFocused
            ? "0 0 0 2px rgba(139, 92, 246, 0.1)"
            : "none",
        }}
      >
        <textarea
          ref={internalRef}
          value={value}
          onChange={(e) => {
            if (maxLength && e.target.value.length > maxLength) return;
            setValue(e.target.value);
          }}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 resize-none outline-none text-sm px-2 py-1.5 min-h-[36px] max-h-[150px]"
        />

        <div className="flex items-center gap-2 pb-1">
          {showCharCount && maxLength && (
            <span
              className={cn(
                "text-[10px] tabular-nums",
                value.length > maxLength * 0.9
                  ? "text-red-400"
                  : "text-zinc-600"
              )}
            >
              {value.length}/{maxLength}
            </span>
          )}
          <motion.button
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              value.trim() && !disabled
                ? "bg-violet-600 text-white hover:bg-violet-500"
                : "bg-zinc-800 text-zinc-600"
            )}
            whileHover={value.trim() ? { scale: 1.05 } : {}}
            whileTap={value.trim() ? { scale: 0.9 } : {}}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    );
  }
);

// =============================================================================
// MessageReaction — Emoji reaction pills with spring animation
// =============================================================================

interface Reaction {
  emoji: string;
  count: number;
  active?: boolean;
}

interface MessageReactionProps {
  reactions: Reaction[];
  className?: string;
  onReact?: (emoji: string) => void;
}

export function MessageReaction({
  reactions,
  className,
  onReact,
}: MessageReactionProps) {
  return (
    <div className={cn("flex flex-wrap gap-1 mt-1", className)}>
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.button
            key={reaction.emoji}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => onReact?.(reaction.emoji)}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors",
              reaction.active
                ? "bg-violet-500/20 border border-violet-500/40 text-violet-300"
                : "bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 hover:bg-zinc-700/60"
            )}
          >
            <span>{reaction.emoji}</span>
            {reaction.count > 0 && (
              <motion.span
                key={reaction.count}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="tabular-nums"
              >
                {reaction.count}
              </motion.span>
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// ChatNotification — Slide-in notification banner
// =============================================================================

type NotificationType = "info" | "success" | "error" | "warning";

interface ChatNotificationProps {
  message: string;
  type?: NotificationType;
  visible?: boolean;
  autoDismiss?: number;
  onDismiss?: () => void;
  className?: string;
}

export function ChatNotification({
  message,
  type = "info",
  visible = true,
  autoDismiss = 5000,
  onDismiss,
  className,
}: ChatNotificationProps) {
  useEffect(() => {
    if (!visible || !autoDismiss || !onDismiss) return;
    const timer = setTimeout(onDismiss, autoDismiss);
    return () => clearTimeout(timer);
  }, [visible, autoDismiss, onDismiss]);

  const typeClasses = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    error: "bg-red-500/10 border-red-500/30 text-red-300",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  };

  const icons = {
    info: "i",
    success: "\u2713",
    error: "\u2717",
    warning: "!",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm",
            typeClasses[type],
            className
          )}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-current/20">
            {icons[type]}
          </span>
          <span className="flex-1">{message}</span>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-current/50 hover:text-current transition-colors"
            >
              \u2715
            </button>
          )}
          {autoDismiss > 0 && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-current/30 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: autoDismiss / 1000, ease: "linear" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// AiResponseCard — Card-style AI response with animated border
// =============================================================================

interface AiResponseCardProps {
  /** Title with typewriter effect */
  title?: string;
  /** Body content to stream */
  content: string;
  className?: string;
  /** Streaming animation */
  animation?: StreamAnimation;
  /** Words per second */
  speed?: number;
  /** Show animated border beam */
  showBorder?: boolean;
  /** Icon/avatar */
  icon?: ReactNode;
  /** Action buttons */
  actions?: ReactNode;
}

export function AiResponseCard({
  title,
  content,
  className,
  animation = "fade",
  speed = 25,
  showBorder = true,
  icon,
  actions,
}: AiResponseCardProps) {
  const [titleComplete, setTitleComplete] = useState(!title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={cn(
        "ai-response-card relative rounded-xl overflow-hidden",
        "bg-zinc-900/80 border border-zinc-800",
        className
      )}
    >
      {/* Animated border beam */}
      {showBorder && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-20 h-20"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.4), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      <div className="relative p-5">
        {/* Header */}
        {(title || icon) && (
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-zinc-800/50">
            {icon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400"
              >
                {icon}
              </motion.div>
            )}
            {title && (
              <h3 className="font-semibold text-zinc-100 text-sm">
                <StreamingText
                  text={title}
                  animation="typewriter"
                  speed={40}
                  showCursor={false}
                  onComplete={() => setTitleComplete(true)}
                />
              </h3>
            )}
          </div>
        )}

        {/* Body */}
        <div className="text-sm text-zinc-300 leading-relaxed">
          {titleComplete && (
            <StreamingText
              text={content}
              animation={animation}
              speed={speed}
            />
          )}
        </div>

        {/* Actions */}
        {actions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: content.split(/\s+/).length / speed + 0.5 }}
            className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/50"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}