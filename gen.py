import os

"""
read src recursively to generate SUMMARY.md

- use first line of file content which doesn't starts with '>' as file name
- use '---' split each section
- for sub directory, generate a sub section. if there is no README.md, then use directory name as sub section name
- use README.md as sub section name

format looks like:

# section 1

* [folder1](path/to/folder1/README.md)
    * [title1](path/to/folder1/file1)
* [folder2](path/to/folder2/README.md)
    * [title3](path/to/folder2/file3)
    * [title4](path/to/folder2/file4)

---

# section 2

* [title5](path/to/file5)
* [title6](path/to/file6)
"""


def gen(dirname) -> str:
    ret = ""
    dirname = "src"
    # gen sections from folders under src
    sections = []
    for root, dirs, files in os.walk(dirname):
        if root == dirname:
            sections = dirs
            break

    for section in sections:
        ret += "# " + section
        ret += "\n"
        for root, dirs, files in os.walk(os.path.join(dirname, section)):
            if root == os.path.join(dirname, section):
                for file in files:
                    if file.endswith(".md"):
                        ret += (
                            "* ["
                            + file[:-3]
                            + "](./"
                            + os.path.join(section, file)
                            + ")"
                        )
                        ret += "\n"
            else:
                ret += (
                    "* ["
                    + os.path.basename(root)
                    + "](./"
                    + os.path.join(section, os.path.basename(root), "README.md")
                    + ")"
                )
                ret += "\n"
                for file in files:
                    if file.endswith(".md"):
                        ret += (
                            "    * ["
                            + file[:-3]
                            + "](./"
                            + os.path.join(section, os.path.basename(root), file)
                            + ")"
                        )
                        ret += "\n"
        ret += "\n"
        ret += "---"
        ret += "\n"

    return ret


def main():
    content = gen("src")
    with open("./src/SUMMARY.md", "w") as f:
        f.write(content)


# replace all ' ' to '-' in file name or directory name recursively
def rename_files(src: str):
    for root, dirs, files in os.walk(src):
        for file in files:
            if " " in file:
                os.rename(
                    os.path.join(root, file), os.path.join(root, file.replace(" ", "-"))
                )
        for dir in dirs:
            if " " in dir:
                os.rename(
                    os.path.join(root, dir), os.path.join(root, dir.replace(" ", "-"))
                )


if __name__ == "__main__":
    main()
    # rename_files("./src")
