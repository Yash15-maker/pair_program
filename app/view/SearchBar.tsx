"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SearchIcon } from "lucide-react";

const formSchema = z.object({
  search: z.string(),
});

const SearchBar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  const router = useRouter();
  const query = useSearchParams();
  const search = query.get("search");
  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/view/?search=${values.search}`);
    } else {
      router.push("/view");
    }
  }

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-[540px] rounded-2xl"
                  placeholder="Filter rooms by keywords, such as typescript, next.js, python"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.getValues("search")}
          className="my-auto border border-gray-200 bg-gray-700 text-white hover:bg-gray-700 rounded-2xl  p-5"
        >
          <SearchIcon className="mr-2" /> Search
        </Button>
        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/view");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SearchBar;
